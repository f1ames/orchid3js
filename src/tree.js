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
            console.log('v', node);
            return node;
        }
    };
    
    namespace.Tree = Tree;
})(window.orchid3);