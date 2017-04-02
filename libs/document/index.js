function Doc() {
    this.text = "";
    this.margin = "";
}

Doc.prototype.addTab = function () {
    this.margin += "    ";
};

Doc.prototype.removeTab = function () {
    if (this.margin.length >= 3) {
        this.margin = this.margin.slice(0, -4);
    } else {
        this.margin = "";
    }
};

Doc.prototype.breakLine = function() {
    this.text += "\n";
};

Doc.prototype.addLine = function (line) {
    this.text += this.margin + line + "\n";
};

Doc.prototype.toString = function () {
    return this.text;
};

module.exports = Doc;