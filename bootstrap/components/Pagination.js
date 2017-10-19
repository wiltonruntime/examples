
define([], function() {
    "use strict";

    var FIRST = String.fromCharCode(171);
    var PREVIOUS = String.fromCharCode(8249);
    var NEXT = String.fromCharCode(8250);
    var LAST = String.fromCharCode(187);
    
    function Pagination(url, pageSize) {
        this.url = url;
        this.pageSize = pageSize;
    }

    Pagination.prototype = {
        buttons: function(currentPage, recordsCount) {
            var bb = [];
            if (recordsCount <= this.pageSize) {
                bb.push(this._createActive("1"));
            } else {
                var lastRaw = Math.floor(recordsCount/this.pageSize);
                var last = (recordsCount % this.pageSize) > 0 ? lastRaw + 1 : lastRaw;
                if (currentPage > 3) {
                    if (currentPage > 4) {
                        bb.push(this._createNormal(1, FIRST));
                        bb.push(this._createNormal(currentPage - 1, PREVIOUS));
                    }
                    bb.push(this._createNormal(1, "1"));
                    if (currentPage > 4) {
                        bb.push(this._createEllipsis());
                    }
                }

                for (var i = Math.max(currentPage - 2, 1); i <= Math.min(currentPage + 2, last); i++) {
                    if (i === currentPage) {
                        bb.push(this._createActive(String(i)));
                    } else {
                        bb.push(this._createNormal(i, String(i)));
                    }
                }

                if (last > currentPage + 2) {
                    if (last > currentPage + 3) {
                        bb.push(this._createEllipsis());
                    }
                    bb.push(this._createNormal(last, String(last)));
                    if (last > currentPage + 3) {
                        bb.push(this._createNormal(currentPage + 1, NEXT));
                        bb.push(this._createNormal(last, LAST));
                    }
                }
            }
            return bb;
        },

        _createNormal: function(index, label) {
            return {
                label: label,
                index: index,
                url: this.url,
                normal: true
            };
        },

        _createActive: function(label) {
            return {
                label: label,
                active: true
            };
        },

        _createEllipsis: function() {
            return {
                label: "...",
                ellipsis: true
            };
        }
    };
    
    return Pagination;
});
