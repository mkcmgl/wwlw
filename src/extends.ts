String.prototype.html2text = function() {
    return this.replace(/ *<[^>]*> */g, '').trim();
};