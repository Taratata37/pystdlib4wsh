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

os.urandom = function (size) {
  var bytes = new Array(size);
  for (var i = 0; i < size; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

os.path = function(){
}

os.path.getmtime = function (strpath){
	var f = os.__fso.getFile(strpath);
	return f.DatelastModified;
}
