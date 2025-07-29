function os(){
}

os.devnull = "nul";
os.sep = "\\";
os.curdir = ".";
os.pardir = "..";
os.name = "nt";

os.__fso = new ActiveXObject("Scripting.FileSystemObject");
os.__wss = new ActiveXObject("WScript.Shell");

os.dirname = function(strpath){
	var réponse;
	réponse = os.__fso.GetParentFolderName(strpath);
	return réponse;
}

os.exists = function (strpath){
	return os.__fso.FileExists(strpath);
}

os.getcwd = function (){
	// Renvoie une chaîne de caractères représentant le répertoire de travail actuel.
	return os.dirname(WScript.ScriptFullName);
}

os.getenv = function (key){
	return os.__wss.Environment("PROCESS").Item(key);
}

os.getlogin = function(){
	return os.__wss.ExpandEnvironmentStrings("%USERNAME%");
}

os.remove = function(strpath){
	var f1 = os.__fso.GetFile(strpath);
	f1.Delete();
}

os.unlink = function (path) {
    os.remove(path);
};


os.urandom = function (size) {
  var bytes = new Array(size);
  for (var i = 0; i < size; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

os.path = (function (_fso) {
    return {
        basename: function (p) {
            return p.replace(/\\/g, "/").split("/").pop();
        },

        dirname: function (p) {
            var parts = p.replace(/\\/g, "/").split("/");
            parts.pop();
            return parts.join("\\");
        },

        join: function () {
            var parts = [];
            for (var i = 0; i < arguments.length; i++) {
                var part = arguments[i];
                if (part) {
                    part = part.replace(/^\\+|\\+$/g, "");
                    parts.push(part);
                }
            }
            return parts.join("\\");
        },

        extname: function (p) {
            var base = p.replace(/\\/g, "/").split("/").pop();
            var index = base.lastIndexOf(".");
            return index !== -1 ? base.slice(index) : "";
        },

        exists: function (p) {
            return _fso.FileExists(p) || _fso.FolderExists(p);
        },

        isfile: function (p) {
            return _fso.FileExists(p);
        },

        isdir: function (p) {
            return _fso.FolderExists(p);
        },

        abspath: function (p) {
            return _fso.GetAbsolutePathName(p);
        },
		
		getmtime : function (strpath){
			var f = os.__fso.getFile(strpath);
			return f.DatelastModified;
		},
		
		split : function(strpath){
			var lastSlashIndex = strpath.lastIndexOf('/');
			var lastPointIndex = strpath.lastIndexOf('.');
			if (lastPointIndex === -1) {
				lastPointIndex = strpath.length;
			}
			if (lastSlashIndex === -1) {
				return ['', strpath.substring(lastSlashIndex + 1, lastPointIndex)];
			} else {
				return [strpath.slice(0, lastSlashIndex), strpath.substring(lastSlashIndex + 1, lastPointIndex)];
			}
		},
		
		basename : function(strpath){
			return strpath.split(/[\\/]/).pop();
		}
    };
})(os.__fso);


os.stat = function (strpath) {
    var f = os.__fso.GetFile(strpath);
    return {
        size: f.Size,
        created: f.DateCreated,
        modified: f.DateLastModified,
        accessed: f.DateLastAccessed,
        path: f.Path,
        name: f.Name,
        type: f.Type
    };
};


os.mkdir = function (strpath) {
    if (!os.__fso.FolderExists(strpath)) {
        os.__fso.CreateFolder(strpath);
    }
};


os.makedirs = function (strpath) {
    var parts = strpath.split(/[\\/]/);
    var current = parts[0];
    for (var i = 1; i < parts.length; i++) {
        current += "\\" + parts[i];
        if (!os.__fso.FolderExists(current)) {
            os.__fso.CreateFolder(current);
        }
    }
};


os.rmdir = function (strpath) {
    if (os.__fso.FolderExists(strpath)) {
        var folder = os.__fso.GetFolder(strpath);
        folder.Delete(true); // true = récursif
    }
};



os.rename = function (src, dst) {
    if (os.__fso.FileExists(src)) {
        var file = os.__fso.GetFile(src);
        file.Name = os.path.basename(dst);
    } else if (os.__fso.FolderExists(src)) {
        var folder = os.__fso.GetFolder(src);
        folder.Name = os.path.basename(dst);
    }
};


os.tmpdir = function () {
    return os.__wss.ExpandEnvironmentStrings("%TEMP%");
};


