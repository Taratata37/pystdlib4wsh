function get(Source){
	var ohttp = WScript.CreateObject('MSXML2.XMLHTTP');
	ohttp.Open('GET', Source, false);
	ohttp.Send();

	if (ohttp.Status == 200){
		return ohttp.ResponseBody;
	}else{
		throw new Error("Réponse HTTP " + ohttp.Status);
	}
}

