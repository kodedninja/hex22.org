function Delog(file, cb) {
	var t = this;
	t.json = null;

	this.init = function() {
		try {
			t.json = JSON.parse(this.responseText);
		} catch (e) {
			console.log('Error in the Log JSON');
		}

		if (t.json) {
			cb();
		}
	}

	this._percents = function(el, unordered, entries, total) {
		var res = order(unordered);

		var others = {hours: 0, entries: 0, percent: 0};

		for (var key in res) {
			var sector_el = new_sector();

			var percent = (res[key]*100/total).toFixed(2)
			if (percent < 1) {
				others.hours += parseFloat(res[key].toFixed(2));
				others.entries += entries[key];
				others.percent += parseFloat(percent);
			} else {
				sector_el.innerHTML = '<h3>' + key + '</h3>' +
									  res[key].toFixed(2) + 'h<br>' +
									  entries[key] + (entries[key] > 1 ? ' logs<br>' : ' log<br>') +
									  percent + '%';

				el.appendChild(sector_el);
			}
		}

		if (others.hours > 0) {
			var others_el = new_sector();


			others_el.innerHTML = '<h3>Others</h3>' +
			others.hours.toFixed(2) + 'h<br>' +
			others.entries + (others.entries > 1 ? ' logs<br>' : ' log<br>') +
			others.percent.toFixed(2) + '%';

			el.appendChild(others_el);
		}
	}

	this.overview = function(el, x, prop) {
		x = x != undefined ? x : 60;
		prop = prop || {empties: false, color: '#000'};

		var date = new Date(); // the starting date
		date.setDate(date.getDate() - x)
		date.setHours(0,0,0,0);

		var log = after(t.json.log, date); // the entries after the starting date

		var days = Object.keys(log).length; // the number of days
		var column_width = (100 / days).toFixed(3);
		for (var time in log) {
			var yp = 0;
			var column = new_column(column_width, new Date(parseInt(time)).toLocaleDateString(), prop.color);

			for (var i = 0; i < log[time].length; i++) {
				var entry = log[time][i];

				var height = Number(calcWidth(parse(entry.e), parse(entry.s)).toFixed(2));
				column.appendChild(new_entry(height, yp, t.json.palette[entry.c] ? t.json.palette[entry.c] : prop.color, entry.c + " - " + entry.t + " - " + entry.d));

				yp += height;
			}

			el.appendChild(column);
		}
	}

	this.total = function(el, x, prop) {
		x = x != undefined ? x : 60;
		prop = prop || {color: '#000', empties: false};

		var date = new Date(); // the starting date
		date.setDate(date.getDate() - x)
		date.setHours(0,0,0,0);

		var log = after(t.json.log, date); // the entries after the starting date

		var days = Object.keys(log).length; // the number of days
		var column_width = (100 / days).toFixed(3);
		for (var time in log) {
			var yp = 0;
			var column = new_column(column_width, new Date(parseInt(time)).toLocaleDateString(), prop.color);

			for (var i = 0; i < log[time].length; i++) {
				var entry = log[time][i];
				var height = Number(calcWidth(parse(entry.e), parse(entry.s)).toFixed(2));
				yp += height;
			}

			var entry_el = new_entry(yp, 0, prop.color);

			column.appendChild(entry_el);
			el.appendChild(column);
		}
	}

	this.query = function(target, el, x, prop) {
		x = x != undefined ? x : 60;
		prop = prop || {color: '#000', empties: false};
		var date = new Date(); // the starting date
		date.setDate(date.getDate() - x)
		date.setHours(0,0,0,0);

		var log = after(t.json.log, date); // the entries after the starting date

		var days = Object.keys(log).length; // the number of days
		var column_width = (100 / days).toFixed(3);
		for (var time in log) {
			var column = new_column(column_width, new Date(parseInt(time)).toLocaleDateString(), prop.color)

			var yp = 0;
			for (var i = 0; i < log[time].length; i++) {
				var entry = log[time][i];
				if ((target.project && target.sector && entry.t == target.project && entry.c == target.sector) ||
					(target.project && !target.sector && entry.t == target.project) ||
					(target.sector && !target.project && entry.c == target.sector)) {
					var height = Number(calcWidth(parse(entry.e), parse(entry.s)).toFixed(2));
					yp += height;
				}
			}

			var entry_el = new_entry(yp, 0, prop.color);
			column.appendChild(entry_el);
			el.appendChild(column);
		}
	}

	this.days = function(el) {
		var date = new Date('2010-01-01'); // the starting date
		date.setHours(0,0,0,0);

		var b = after(t.json.log, date), r = 0;
		var days = Object.keys(b).length;
		var res = 0;
		for (var i in b) {

			if (b[i].length > 0) {
				res = days - r;
				break;
			}
			r++;
		}

		el.innerHTML = res + (res > 1 ? ' days' : ' day');
	}

	this.sector_colors = function(el, prop) {
		for (var sect in t.json.palette) {
			var color = t.json.palette[sect];

			var sector_el = document.createElement('div');
			sector_el.classList = 'sector';
			sector_el.style.marginTop = '5px';
			sector_el.style.display = 'inline-block';
			var sector_name = document.createElement('span');
			sector_name.innerHTML = sect;
			sector_name.style.fontSize = prop.fontSize ? prop.fontSize : '14px';
			var color_el = document.createElement('div');
			color_el.style.width = prop.fontSize ? prop.fontSize : '14px';
			color_el.style.height = prop.fontSize ? prop.fontSize : '14px';
			color_el.style.display = prop.block ? 'block' : 'inline-block';
			color_el.style.background = color;
			color_el.style.margin = '0 15px';

			sector_el.appendChild(color_el);
			sector_el.appendChild(sector_name);
			el.appendChild(sector_el);
		}
	}

	this.sectors= function(el) {
		var unordered = {}, entries = {}, total = 0;
		for (var i = 0; i < t.json.log.length; i++) {
			var entry = t.json.log[i];
			if (!unordered[entry.c]) unordered[entry.c] = 0;
			if (!entries[entry.c]) entries[entry.c] = 0;
			entries[entry.c]++;
			var d = parseFloat(duration(parse(entry.s), parse(entry.e)));
			if (d) total += d;
			unordered[entry.c] += d;
		}

		t._percents(el, unordered, entries, total);
	}

	this.projects = function(el) {
		var unordered = {}, entries = {}, total = 0;
		for (var i = 0; i < t.json.log.length; i++) {
			var entry = t.json.log[i];
			if (!unordered[entry.t]) unordered[entry.t] = 0;
			if (!entries[entry.t]) entries[entry.t] = 0;
			entries[entry.t]++;
			var d = parseFloat(duration(parse(entry.s), parse(entry.e)))
			if (d) total += d;
			unordered[entry.t] += d;
		}

		t._percents(el, unordered, entries, total);
	}

	this.latest = function(el, x, separator) {
		separator = separator || ' - ';

		for (var i = t.json.log.length - 1; i >= t.json.log.length - x && i >= 0; i--) {
			var entry = t.json.log[i];
			var s = parse(entry.s);
			var e = parse(entry.e);

			var date = convert(s);

			var entry_el = document.createElement('div');
			entry_el.classList = 'entry';
			entry_el.style.width = '100%';
			entry_el.style.display = 'block';
			entry_el.style.margin = '15px 0';

			entry_el.innerHTML = (date.getMonth() + 1) + '.' + date.getDate() +
								 separator + duration(s, e) + 'h' +
								 separator + entry.c +
								 separator + entry.t +
								 separator + entry.d;
			el.appendChild(entry_el)
		}
	}

	function new_sector() {
		var s = document.createElement('div');
		s.classList = 'sector';
		s.style.width = '25%';
		s.style.display = 'inline-block';
		s.style.margin = '15px 0';
		return s;
	}

	function new_column(width, title, border) {
		var c = document.createElement('div');
		c.classList = 'column';

		if (title) c.title = title;
		c.style.width = (width - 0.4) + '%';
		c.style.margin = '0 ' + 0.2 + '%';
		c.style.position = "relative";
		c.style.height = "100%";
		c.style.display = "inline-block";
		c.style.borderBottom = "1px solid rgba(0,0,0,0)";
		if (border) c.style.borderColor = border;

		return c;
	}

	function new_entry(height, yp, color, title) {
		var e = document.createElement('div');

		if (title) e.title = title;
		e.classList = "entry";
		e.style.width = "100%";
		e.style.height = height + '%';
		e.style.bottom = yp + '%';
		e.style.background = color;
		e.style.position = "absolute";

		return e;
	}

	function after(log, date) {
		var res = {};

		var from = date.getTime(), now = new Date();
		now.setHours(0,0,0,0);
		now = now.getTime();

		// addDays helper function from joshavanier
		Date.prototype.addDays = function(days) {
	      let date = new Date(this.valueOf())
	      date.setDate(date.getDate() + days)
	      return date
	    }

		var day = new Date(date.getTime());
		day.setHours(0,0,0,0);
		day = day.addDays(1); // tomorrow 00:00

		while (day.getTime() <= now) {
			res[day.getTime().toString()] = [];
			day = day.addDays(1);
		}

		from = parse(to_hex(date)); // simply converting to it doesn't work
		for (var i = 0; i < log.length; i++) {
			var end = parse(log[i].e);
			if (end && end > from) {
				var day = convert(parse(log[i].e));
				day.setHours(0,0,0,0);
				if (res[day.getTime().toString()]) res[day.getTime().toString()].push(log[i]);
			}
		}
		return res;
	}

	function after_filter(log, date) {
		var b = after(log, date), r = 0;
		var days = Object.keys(b).length;
		var res = 0;
		for (var i in b) {

			if (b[i].length > 0) {
				console.log(b[i])
				res = days - r;
				break;
			}
			r++;
		}

		return res;
	}

	function order(json) {
		var res = {}, a = [];

		for (var key in json) {
			a.push(json[key]);
		}

		a = a.sort(function(a, b) {
			return b - a;
		});

		function getKeyByValue(object, value) {
  			return Object.keys(object).find(key => object[key] === value);
		}

		for (var i = 0; i < a.length; i++) {
			res[getKeyByValue(json, a[i])] = a[i];
		}

		return res;
	}

	// From joshavanier's Log
	function calcWidth(a, b) {
      return (a - b) / 86400 * 100
    }

	function parse(s) {
      return parseInt(s, 16)
    }


    function to_hex(t) {
      return (new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()).getTime() / 1E3).toString(16)
    }

	function convert(t) {
      return new Date(t * 1E3)
    }

	function duration(a, b) {
      return ((b - a) / 3600).toFixed(2)
    }

	// load the file

	var request = new XMLHttpRequest();
	request.addEventListener("load", this.init);
	request.open("GET", file);
	request.send();

	return this;
}
