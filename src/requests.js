function file(){
	
}

file.prototype.set = function(data){
	this.bdata = data;
}

file.prototype.read = function(){
	return this.bdata;
}


function urlopen(Source){
	var ohttp = WScript.CreateObject('MSXML2.XMLHTTP');
	ohttp.Open('GET', Source, false);
	ohttp.Send();

	if (ohttp.Status == 200){
		var reponse = new file;
		reponse.set(ohttp.ResponseBody)
		return reponse;
	}else{
		throw new Error("Réponse HTTP " + ohttp.Status);
	}
}

