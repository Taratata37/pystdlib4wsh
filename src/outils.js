function executable(){
	return WScript.fullName;
}

function interpreteur() {
	if (executable().slice(-12).toLowerCase() !== '\\cscript.exe') {
		return 'wscript';
	}else{
		return 'cscript';
	}
}

function forcer_console() {
	if (interpreteur() !== 'cscript') {
		var cmd = 'cscript.exe //nologo "' + WScript.scriptFullName + '"';
		var args = WScript.arguments;
		for (var i = 0, len = args; i < len; i++) {
			var arg = args(i);
			cmd += ' ' + (~arg.indexOf(' ') ? '"' + arg + '"' : arg);
		}
		new ActiveXObject('WScript.Shell').run(cmd);
		WScript.quit();
	}
}