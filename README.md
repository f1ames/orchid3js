orchid3js
=========

**Library for building decision trees with js. Based on ID3 algorithm**.


Pretty simple and straightforward to use. Just include the script e.g.
```html
<script type="text/javascript" src="orchid3.min.js"></script>
```
then you can use factory to build tree
```javascript
var tree = orchid3.factory(trainingSetAsString, rowsSeparator, valuesSeparator);
```
To test tree (or rather get decision) use getDecision method
```javascript
tree.getDecision(sampleData);
```

**Example**
```javascript
var set = 'sunny,hot,high,weak,no;sunny,hot,high,strong,no;overcast,hot,high,weak,yes;',
    test = orchid3.Util.parseData('sunny,hot,high,weak', ';', ','), //or test can already be an array like [['sunny', 'hot', 'high', 'weak']]
    tree = orchid3.factory(set, ';', ',');
tree.getDecision(test); //should return 'no'
```

See our [demo](http://f1ames.github.io/orchid3js) for working, testable example and sample view class for drawing the tree!