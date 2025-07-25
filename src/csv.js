
function _trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function parse(text, delimiter) {
    delimiter = delimiter || ",";
    var lines = text.split(/\r?\n/);
    var result = [];

    for (var i = 0; i < lines.length; i++) {
        var line = _trim(lines[i]);
        if (line === "") continue;

        var values = [];
        var current = "";
        var inQuotes = false;

        for (var j = 0; j < line.length; j++) {
            var chari = line.charAt(j);

            if (chari === '"') {
                if (inQuotes && line.charAt(j + 1) === '"') {
                    current += '"';
                    j++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (chari === delimiter && !inQuotes) {
                values.push(current);
                current = "";
            } else {
                current += chari;
            }
        }

        values.push(current);
        result.push(values);
    }

    return result;
};


function stringify(data, delimiter) {
	delimiter = delimiter || ",";
	var lines = [];

	for (var i = 0; i < data.length; i++) {
		var line = data[i];
		var values = [];

		for (var j = 0; j < line.length; j++) {
			var value = line[j];
			if (value.indexOf(delimiter) !== -1 || value.indexOf('"') !== -1) {
				value = '"' + value.replace(/"/g, '""') + '"';
			}
			values.push(value);
		}

		lines.push(values.join(delimiter));
	}

	return lines.join("\r\n");
};

function DictReader(text, delimiter) {
	delimiter = delimiter || ",";
	var rows = parse(text, delimiter);
	if (rows.length === 0) return [];

	var headers = rows[0];
	var result = [];

	for (var i = 1; i < rows.length; i++) {
		var row = rows[i];
		var obj = {};

		for (var j = 0; j < headers.length; j++) {
			var key = headers[j];
			var value = row[j] !== undefined ? row[j] : "";
			obj[key] = value;
		}

		result.push(obj);
	}

	return result;
};

function DictWriter(data, fieldnames, delimiter) {
	delimiter = delimiter || ",";
	var lines = [];

	lines.push(fieldnames.join(delimiter));

	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var values = [];

		for (var j = 0; j < fieldnames.length; j++) {
			var key = fieldnames[j];
			var value = row[key] !== undefined ? row[key] : "";

			if (value.indexOf(delimiter) !== -1 || value.indexOf('"') !== -1) {
				value = '"' + value.replace(/"/g, '""') + '"';
			}

			values.push(value);
		}

		lines.push(values.join(delimiter));
	}

	return lines.join("\r\n");
};
