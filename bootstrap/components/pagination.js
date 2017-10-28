
define([], function() {
    "use strict";

    var FIRST = String.fromCharCode(171);
    var PREVIOUS = String.fromCharCode(8249);
    var NEXT = String.fromCharCode(8250);
    var LAST = String.fromCharCode(187);

    
    function createNormal(url, index, label) {
        return {
            label: label,
            index: index,
            url: url,
            normal: true
        };
    }

    function createActive(label) {
        return {
            label: label,
            active: true
        };
    }

    function createEllipsis() {
        return {
            label: "...",
            ellipsis: true
        };
    }
    
    return function(url, pageSize, currentPage, recordsCount) {
        var bb = [];
        if (recordsCount <= pageSize) {
            bb.push(createActive("1"));
        } else {
            var lastRaw = Math.floor(recordsCount/pageSize);
            var last = (recordsCount % pageSize) > 0 ? lastRaw + 1 : lastRaw;
            if (currentPage > 3) {
                if (currentPage > 4) {
                    bb.push(createNormal(url, 1, FIRST));
                    bb.push(createNormal(url, currentPage - 1, PREVIOUS));
                }
                bb.push(createNormal(url, 1, "1"));
                if (currentPage > 4) {
                    bb.push(createEllipsis());
                }
            }

            for (var i = Math.max(currentPage - 2, 1); i <= Math.min(currentPage + 2, last); i++) {
                if (i === currentPage) {
                    bb.push(createActive(String(i)));
                } else {
                    bb.push(createNormal(url, i, String(i)));
                }
            }

            if (last > currentPage + 2) {
                if (last > currentPage + 3) {
                    bb.push(createEllipsis());
                }
                bb.push(createNormal(url, last, String(last)));
                if (last > currentPage + 3) {
                    bb.push(createNormal(url, currentPage + 1, NEXT));
                    bb.push(createNormal(url, last, LAST));
                }
            }
        }
        return bb;
    };
});
