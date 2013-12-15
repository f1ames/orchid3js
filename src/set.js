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
            console.log('maxgain ' + maxIndex, max);
            return maxIndex;
        },
        getGain: function(col) {
            var sets = this.getSubsets(col),
                gain = this.getEntropy();
            for(var i in sets) {
                gain -= (sets[i].getLength()/this.length) * sets[i].getEntropy();
            }   
            console.log('gain', gain);
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
            console.log('subsets', subsets);
            return subsets;
        }
    };
    
    namespace.Set = Set;
})(window.orchid3);