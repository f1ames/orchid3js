orchid3js
=========

Library for building decision trees with js. Based on ID3 algorithm.
Pretty simple and straight forward to use. Just include the script e.g.
```html
<script type="text/javascript" src="orchid3.js"></script>
```
than you can use factory to build tree
```javascript
var tree = window.orchid3.factory(trainingSetAsString, rowsSeparator, valuesSeparator);
```