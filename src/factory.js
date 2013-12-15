(function(namespace) {
    
    namespace.factory = function(dataAsString, rowsSeparator, valuesSeparator) {
        return new namespace.Tree(new namespace.Set(
            namespace.Util.parseData(dataAsString, rowsSeparator || ';', valuesSeparator || ',')
        ));
    }
})(window.orchid3);