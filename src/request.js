function file(){
	
}

file.prototype.set = function(data){
	this.bdata = data;
}

file.prototype.read = function(){
	return this.bdata;
}

function request(){
	
}

request.urlopen = function (Source){
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

request.Request = function (){
	
};

request.Request.add_header = function(clé, valeur){
	this.headers[clé] = valeur;
};

request.urlopen_b = function(Source, method, postData) {
    var ohttp = WScript.CreateObject('MSXML2.XMLHTTP');
    ohttp.Open(method, Source, false);
    ohttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ohttp.Send(postData);

    if (ohttp.Status === 200) {
        var response = new file();
        response.set(ohttp.ResponseBody);
        return response;
    } else {
        throw new Error("Réponse HTTP " + ohttp.Status);
    }
};