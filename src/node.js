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