// Import URL module
var url = require('url');

// Website address
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';

// Parse the URL
var q = url.parse(adr, true);

// Display different parts
console.log("Host:", q.host);
console.log("Pathname:", q.pathname);
console.log("Search:", q.search);

// Query data object
var qdata = q.query;

console.log("Year:", qdata.year);
console.log("Month:", qdata.month);