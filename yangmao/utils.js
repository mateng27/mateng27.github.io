function ImgPreload(data, complete) {
    var num = 0;
    var out = {};
    for (var i in data) {
        if (data[i] != undefined) {
            num++;
            var img = new Image();
            img.onload = function () {
                num--;
                //console.log('num ', num)
                if (num == 0 && complete) {
                    complete();
                }
            }
            img.src = data[i];
            out[i] = img;
        }
    }
    return out;
}

/*//自适应
window.DAdaption = (function(){
    var html = document.getElementsByTagName('html'),
        obj = {},
        resize = function(){
            html[0].style.cssText = 'font-size:'+window.innerWidth/640*40+'px';
            //执行计时对象集合
            for(var i in obj) {
                obj[i]();
            }
            console.log(obj);
        };
    resize();
    window.addEventListener("resize", resize, false);
    return {
        add:function(o,callback){
            obj[o] = callback;
            obj[o]();
        }
    }
})();*/

var UrlUtils = {

    getHashString: function (url) {
        url = (url || location.href) + "";
        var match = url.match(/[^#]+\#([^?]*)/, '$1');// url.match(/#(.*)$/);
        return match ? match[1] + "" : '';
    },

    getQueryString: function (url) {
        url = (url || location.href) + "";
        var query = url.match(/[^\?]+\?([^#]*)/, '$1');
        return query ? query[1] + "" : '';
    },

    getBase: function (url) {
        url = (url || location.href) + "";
        return url.split("?" + UrlUtils.getQueryString(url)).join("").split("#" + UrlUtils.getHashString(url)).join("");
    },


    getQueryMap: function (url) {
        url = (url || location.href) + "";
        var query = UrlUtils.getQueryString(url);
        return UrlUtils.stringToMap(query);
    },

    getHashMap: function (url) {
        url = (url || location.href) + "";
        var query = UrlUtils.getHashString(url);
        return UrlUtils.stringToMap(query);
    },


    stringToMap: function (query) {
        var map = {};
        if (query == "") return map;
        var part = query.split('&');
        for (var i = 0, len = part.length; i < len; i++) {
            var result = part[i].split('=');
            var key = result[0], value = result[1];
            //将"c="认为key为c，value为null，将"e"认为key为e，value为true
            map[key] = value || (typeof value == 'string' ? null : true);
        }
        return map;
    }
};


var Validaters = (function () {
    function validateName(uname) {
        if (!isNaN(uname) || $.trim(uname) == 'test' || $.trim(uname) == '' || $.trim(uname) == '空白' || $.trim(uname) == 'Unknown' || $.trim(uname) == '未知' || $.trim(uname) == '未告知') {
            return false;
        }
        return true;
    }

    function validateEmpty(data) {
        if ($.trim(data) == "") {
            return false;
        }
        return true;
    }

    function validateMobile(mobile) {
        if (!(/^1[34578]\d{9}$/.test(mobile))) {
            return false
        }
        return true;
    }

    return {
        validateName: validateName,
        validateEmpty: validateEmpty,
        validateMobile: validateMobile
    }
})();

