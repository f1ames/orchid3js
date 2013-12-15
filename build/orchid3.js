/* orchid3.js by Krzysztof Krztoń (aka f1ames). id3 algorithm in js. */

window.orchid3 = window.orchid3 || {};


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


(function(namespace) {
    
    var log2 = function(value) {
        return value == 0 ? 1 : Math.log(value) / Math.log(2);
    },
    Set = function(data) {
        this.data = data;
        this.entropy = undefined;
        this.length = this.data.length;
        this.cols = this.get(0).length - 1;
        this.used = new Array(this.cols);
    };
    Set.prototype = {
        get: function(index) {
            return this.data[index] ? this.data[index] : undefined;
        },
        getLength: function() {
            return this.length;
        },
        getDecision: function(index) {
            return this.data[((index === undefined) ? 0 : index)][this.cols];
        },
        getEntropy: function() {
            if(!this.entropy) {
                var entropy = 0,
                    groups = {};
                for(var i = 0; i < this.length; i++) {
                    var decision = this.getDecision(i);
                    if(!groups[decision]) {
                        groups[decision] = 0;
                    }
                    groups[decision]++;
                }
                for(var j in groups) {
                    entropy = entropy - (groups[j]/this.length) * log2(groups[j]/this.length);
                }
                this.entropy = entropy;
            }            
            return this.entropy;
        },
        getMaxGainIndex: function() {
            var max = 0,
                maxIndex = undefined;
            for(var i = 0; i < this.cols; i++) {
                if(this.used[i] !== true) {
                    var gain = this.getGain(i);
                    if(gain > max) {
                        max = gain;
                        maxIndex = i;
                    }
                }                
            }
            if(maxIndex !== undefined) {
                this.used[maxIndex] = true;
            }            
            
            return maxIndex;
        },
        getGain: function(col) {
            var sets = this.getSubsets(col),
                gain = this.getEntropy();
            for(var i in sets) {
                gain -= (sets[i].getLength()/this.length) * sets[i].getEntropy();
            }   
            
            return gain;            
        },
        getSubsets: function(col) {
            var tmp = {},
                subsets = {};
            for(var i in this.data) {
                var value = this.data[i][col];
                if(tmp[value] === undefined) {
                    tmp[value] = [];
                }
                tmp[value].push(this.data[i]);
            }
            for(var j in tmp) {
                subsets[j] = new namespace.Set(tmp[j]);
            }
            
            return subsets;
        }
    };
    
    namespace.Set = Set;
})(window.orchid3);


(function(namespace){

    var Tree = function(set) {   
        this.fullSet = set;
        this.root = new namespace.Node('root', this.fullSet);
    };
    Tree.prototype = {
        getRoot: function() {
            return this.root;
        },
        getSet: function() {
            return this.fullSet;
        },
        getDecision: function(values) {
            var node = this.root,
                child;
            for(var i = 0; i <= values.length; i++) {
                child = node.getChild(values[i]);
                if(child !== undefined) {
                    node = child;
                }
                else {
                    var children = node.getChildren();
                    if(children.length === 1 && children[0].isLeaf()) {
                        node = children[0];
                    }
                }
            }
            
            return node;
        }
    };
    
    namespace.Tree = Tree;
})(window.orchid3);


(function(namespace) {
    
    var count = 0,
    Node = function(value, set, parent) {
        this.id = count;
        this.children = [];
        this.parent = parent;        
        this.value = value;
        this.set = set;
        count++;
        this.build();
    };
    Node.prototype = {
        build: function() {
            if(this.set) {
                var entropy = this.set.getEntropy();
                if(entropy == 0) {
                    this.addChild(
                        new namespace.Node(this.set.getDecision(), undefined, this));
                }
                else {
                    var index = this.set.getMaxGainIndex(),
                        sets;
                    if(index !== undefined) {
                        sets = this.set.getSubsets(index);
                        for(var i in sets) {
                            this.addChild(
                                new namespace.Node(i, sets[i], this));
                        }
                    }
                }
            }
        },
        getId: function() {
            return this.id;
        },
        getValue: function() {
            return this.value;
        },
        getParent: function() {
            return this.parent;
        },
        getChildren: function() {
            return this.children;
        },
        isRoot: function() {
            return this.parent === undefined;
        },
        isLeaf: function() {
            return this.children.length === 0;
        },
        addChild: function(node) {
            this.children.push(node);
        },
        getChild: function(value) {
            var child = undefined;
            for(var i in this.children) {
                if(this.children[i].getValue() === value) {
                    child = this.children[i];
                    break;
                }
            }
            return child;
        }
    };
    
    namespace.Node = Node;
 })(window.orchid3);


(function(namespace) {
    
    namespace.factory = function(dataAsString, rowsSeparator, valuesSeparator) {
        return new namespace.Tree(new namespace.Set(
            namespace.Util.parseData(dataAsString, rowsSeparator || ';', valuesSeparator || ',')
        ));
    }
})(window.orchid3);