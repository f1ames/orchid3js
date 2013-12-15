(function(namespace) {
    
    var View = function(tree, $container) {
        this.tree = tree;
        this.$container = $container;        
    };
    View.prototype = {
        draw: function() {
            var nodes = [this.tree.getRoot()];
            this.$container.empty();
            this.drawChildren(nodes, this.$container); 
            this.initHighlights();
        },
        drawChildren: function(nodes, $container) {
            var number = nodes.length,
                width = 100 / number;
            for(var i in nodes) {
                var $wrapper = this.createNode(nodes[i], width);
                $container.append($wrapper);
                this.drawChildren(nodes[i].getChildren(), $wrapper);
            }
        },
        createNode: function(node, width) {
            return $(                
                '<div class="node" id="node' + node.getId() + '" style="width:' + width + '%;">' + 
                    '<div><button type="button" class="btn btn-default">' + node.getValue() + '</button></div></div>'
            );
        },
        initHighlights: function() {
            this.$container.find('.node button').on('mouseover', function(e) {
                $(this).parents('.node').addClass('highlighted');
            });
            this.$container.find('.node button').on('mouseout', function(e) {
                $(this).parents('.node').removeClass('highlighted');
            });
        },
        highlight: function(node) {
            this.$container.find('.node').removeClass('answer');
            this.$container.find('#node' + node.getId()).addClass('answer').parents('.node').addClass('answer');
        }
    };

    namespace.View = View;
})(window.orchid3);