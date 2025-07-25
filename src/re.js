// re.js
function search(pattern, text) {
    var re = new RegExp(pattern);
    return re.test(text);
}

function match(pattern, text) {
    return this.search("^" + pattern,text);
}
