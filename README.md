# JS-add-remove-styles
A set of functions to facilitate easily adding and removeing CSS styles from JavaScript.

Not really a "library", more a set of functions.

Usage is simple, here is an example:
<code>
var style = "div.lrms-productTile:has(rdc-svg[name='badge-offer']) { display: none; }";
addStyle(style);
deleteStyle(style);
</code>

You can also use <code>toggleStyle()</code> to switch a style on and off.
All functions return true on success, false otherwise.

The other four function are just for internal use.
