orchid3js
=========

**Library for building decision trees with js. Based on ID3 algorithm**.


Pretty simple and straightforward to use. Just include the script e.g.
```html
<script type="text/javascript" src="orchid3.js"></script>
```
then you can use factory to build tree
```javascript
var tree = orchid3.factory(trainingSetAsString, rowsSeparator, valuesSeparator);
```
To test tree (or rather get decision) use getDecision method
```javascript
tree.getDecision(sampleData);
```

See our [demo](http://krzton.com/orchid3.html) for working, testable example and sample view class for drawing the tree!