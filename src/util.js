(function(namespace) {
    
    namespace.Util = {
        parseData: function(dataAsString, rowsSeparator, valuesSeparator) {
            var data = [],
                rows = dataAsString.replace(/\r?\n|\r/g, '').split(rowsSeparator);
            for(var i in rows) {
                var values = rows[i].split(valuesSeparator),
                    tmp = [];
                for(var j in values) {
                    tmp.push(values[j].replace(/\W/g, ''));
                }
                data.push(tmp);
            }
            return data;
        }
    };
})(window.orchid3);