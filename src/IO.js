function IOBase(){
	
}

IOBase.prototype.close = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.closed = function() {
	return true;
}

IOBase.prototype.fileno = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.flush = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.isatty = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.readable = function() {
	return !this.closed();
}

IOBase.prototype.readline = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.readlines = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.seek = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.seekable = function() {
	return !this.closed();
}

IOBase.prototype.tell = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.truncate = function() {
	throw new Error("Méthode abstraite");
}

IOBase.prototype.writable = function() {
	return !this.closed();
}

IOBase.prototype.writelines = function() {
	throw new Error("Méthode abstraite");
}


function TextIOBase(){
	this.ostream = new ActiveXObject("ADODB.Stream");
    this.bclosed = true;
    this.mecriture = false;
	this.nomfichier = "";
	this.strencoding = "";
	IOBase.call(this);
}
//En JScript, l'héritage est déterminé par prototye.
TextIOBase.prototype = new IOBase();

TextIOBase.prototype.closed = function() {
	return this.bclosed;
}

TextIOBase.prototype.read = function() {
	 if (this.readable()) {
		var strtmp = this.ostream.ReadText();
		if (this.anewline === "None") {
			strtmp = strtmp.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		} else if (this.anewline !== "") {
			strtmp = strtmp.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n/g, this.LineSeparatorChar());
		}
		return strtmp;
	} else {
		throw new Error("Fichier fermé");
	}
}

TextIOBase.prototype.LineSeparator = function() {
	switch(this.anewline){
		case "\n":
			return 10;
		case "\r":
			return 13;
		default:
			return -1;
	}
}

TextIOBase.prototype.readline = function() {
	if (this.readable()) {
		this.ostream.LineSeparator = this.LineSeparator();
		return this.ostream.ReadText(-2);
	} else {
		throw new Error("Fichier fermé");
	}
}

TextIOBase.prototype.readlines = function() {
	return this.read().split(this.LineSeparatorChar());
}

TextIOBase.prototype._open = function(nom_fichier, mode, encoding, newline) {
	if (mode.indexOf('r') >= 0 || mode.indexOf('w') >= 0 || mode.indexOf('x') >= 0) {
		this.strencoding = encoding;
		this.ostream.Charset = encoding;
		this.ostream.open();
		this.nomfichier = nom_fichier;
		this.ostream.LoadFromFile(this.nomfichier);
		this.bclosed = false;
		this.anewline = newline;
	}
}

TextIOBase.prototype.LineSeparatorChar = function() {
	switch(this.anewline){
		case "\n":
			return "\n";
		case "\r":
			return "\r";
		default:
			return "\r\n";
	}
}

TextIOBase.prototype.write = function(strtexte) {
	 if (this.writable()) {
		this.ostream.WriteText(strtexte.replace("\n", this.LineSeparatorChar()));
		this.mecriture = true;
	} else {
		throw new Error("Fichier fermé");
	}
}

TextIOBase.prototype.seek = function(offset) {
	if (this.seekable()){
		this.ostream.position = offset
		return offset;
	}else{
		throw new Error("Not seekable");
	}
}

TextIOBase.prototype.tell = function() {
	if (this.seekable()){
		return this.ostream.position;
	}else{
		throw new Error("Not seekable");
	}
}

TextIOBase.prototype.flush = function() {
	if (!this.closed()){
		if (this.mecriture){
			var tmp = this.tell();
			this.ostream.SaveToFile(this.nomfichier, 2);
			this.seek(tmp);
		}
	}
}

TextIOBase.prototype.close = function() {
	if (!this.closed()){
		this.flush();
		this.ostream.close();
		this.bclosed = true;
	}
}

TextIOBase.prototype.encoding = function() {
	return this.strencoding;
}

TextIOBase.prototype.detach = function() {
	throw new Error("Unsupported Operation");
}


function RawIOBase(){
	this.ostream = new ActiveXObject("ADODB.Stream");
    this.bclosed = true;
    this.mecriture = false;
	this.nomfichier = "";
	IOBase.call(this);
}

RawIOBase.prototype = new IOBase();

RawIOBase.prototype._open = function(nom_fichier) {
	this.ostream.open();
	this.ostream.Type = 1;
	this.nomfichier = nom_fichier;
	this.bclosed = false;
}

RawIOBase.prototype.read = function(){
	
};

RawIOBase.prototype.readall = function(){
	
};

RawIOBase.prototype.write = function(data){
	this.ostream.Write(data);
	this.mecriture = true;
};

RawIOBase.prototype.flush = function() {
	if (!this.closed()){
		if (this.mecriture){
			var tmp = this.tell();
			this.ostream.SaveToFile(this.nomfichier, 2);
			this.seek(tmp);
		}
	}
}

RawIOBase.prototype.close = function() {
	if (!this.closed()){
		this.flush();
		this.ostream.close();
		this.bclosed = true;
	}
}

RawIOBase.prototype.closed = function() {
	return this.bclosed;
}

RawIOBase.prototype.seek = function(offset) {
	if (this.seekable()){
		this.ostream.position = offset
		return offset;
	}else{
		throw new Error("Not seekable");
	}
}

RawIOBase.prototype.tell = function() {
	if (this.seekable()){
		return this.ostream.position;
	}else{
		throw new Error("Not seekable");
	}
}


function open(nom_fichier, mode, encoding, newline) {
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (mode.indexOf('x') >= 0){
		if (fso.FileExists(nom_fichier)){
			throw new Error("Le fichier existe déjà");
		}
	}
	if (mode.indexOf('w') >= 0){
		if (fso.FileExists(nom_fichier)){
			fso.DeleteFile(nom_fichier);
		}
	}
	if (mode.indexOf('b') >= 0){
		var ofichier = new RawIOBase();
		ofichier._open(nom_fichier);
		return ofichier;
	}else{
		var ofichier = new TextIOBase();
		ofichier._open(nom_fichier, mode, encoding, newline);
		return ofichier;
	}
};


function configparser(){
	
}

configparser.prototype._extraire_section= function(ligne) {
	return ligne.substring(1, ligne.indexOf(']'));
}

configparser.prototype._extraire_cle= function(ligne) {
	return ligne.substring(0, ligne.indexOf('='));
}

configparser.prototype._extraire_valeur= function(ligne) {
	return ligne.substring(ligne.indexOf('=') + 1);
}

configparser.prototype._est_une_section= function(ligne) {
	return ligne.indexOf('[') == 0 && ligne.indexOf(']') > 0;
}

configparser.prototype._est_une_affectation= function(ligne) {
	return ligne.indexOf('=') > -1;
}

configparser.prototype.read_file = function(ofichier){
	ofichier.seek(0);
	var lignes = ofichier.readlines();
	
	this.dico_ini = new ActiveXObject("Scripting.Dictionary");
	var section;
	for (var i = 0; i < lignes.length; i++) {
		if (this._est_une_section(lignes[i])) {
			section = this._extraire_section(lignes[i]);
			if (!this.dico_ini.Exists(section)) {
				this.dico_ini.add(section, new ActiveXObject("Scripting.Dictionary"));
			}
		} else if (this._est_une_affectation(lignes[i])) {
			var cle = this._extraire_cle(lignes[i]);
			var valeur = this._extraire_valeur(lignes[i]);
			this.dico_ini(section).add(cle, valeur);
		}
	}
}

configparser.prototype.sections = function(){
	throw new Error("Non implémenté");
}

configparser.prototype.read = function(){
	throw new Error("Non implémenté, essayez 'read_file' à la place");
}

configparser.prototype.get = function(section, option, raw, vars, fallback){
	return this.dico_ini(section)(option);
}

configparser.prototype.getboolean = function(section, option, raw, vars, fallback){
	var tmp = this.dico_ini(section)(option);
	if (tmp.toLowerCase() === "true" || tmp === "1" || tmp.toLowerCase() === "yes" || tmp.toLowerCase() === "on"){
		return true;
	}else{
		return false;
	}
}

