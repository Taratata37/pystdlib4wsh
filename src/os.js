function dirname(strpath){
	var réponse;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	réponse = fso.GetParentFolderName(strpath);
	return réponse;
}

function exists(strpath){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	return fso.FileExists(strpath);
}