(function(namespace) {
    
    var UI = function() {
        this.$controls = $('#controls');
        this.$toggleBtn = this.$controls.find('.btn-toggle');
        this.init();
    };
    UI.prototype = {
        init: function() {
            var self = this;
            this.$toggleBtn.on('click', function() {
                $(this).hasClass('toggled') ? self.showPanel() : self.hidePanel() ;
            });
            $('.btn-sample-data').on('click', function() {
                self.loadSampleData();
            });
            $('.btn-build-tree').on('click', function() {
                self.tree = window.orchid3.factory($('.training-set').val(), $('.rows-separator').val(), $('.values-separator').val());
                self.view = new window.orchid3.View(self.tree, $('#board'));
                self.view.draw();
                self.hidePanel();
            });
            $('.btn-test-tree').on('click', function() {
                var data = window.orchid3.Util.parseData($('.test-values').val(), $('.rows-separator').val(), $('.values-separator').val());
                self.view.highlight(self.tree.getDecision(data[0]));
                self.hidePanel();
            });
        },
        loadSampleData: function() {
            $('.rows-separator').val(';');
            $('.values-separator').val(',');
            $('.test-values').val('sunny,hot,high,weak');
            $('.training-set').text(                'sunny,hot,high,weak,no;\rsunny,hot,high,strong,no;\rovercast,hot,high,weak,yes;\rrain,mild,high,weak,yes;\rrain,cool,normal,weak,yes;\rrain,cool,normal,strong,no;\rovercast,cool,normal,strong,yes;\rsunny,mild,high,weak,no;\rsunny,cool,normal,weak,yes;\rrain,mild,normal,weak,yes;\rsunny,mild,normal,strong,yes;\rovercast,mild,high,strong,yes;\rovercast,hot,normal,weak,yes;\rrain,mild,high,strong,no');            
        },
        showPanel: function() {
            this.$toggleBtn.text('hide').removeClass('toggled');
            this.$controls.animate({top: '25px'}, 1000);
        },
        hidePanel: function() {
            this.$toggleBtn.text('show').addClass('toggled');
            this.$controls.animate({top: '-500px'}, 1000);
        }
    };
    
    namespace.UI = UI;
})(window.orchid3);


new window.orchid3.UI();