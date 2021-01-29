/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

const { setSparkLineData, drawSparkLine } = require('./es6/sparkLine')
const { formatTableData } = require('./es6/table')

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  // Subscribing to the prices data
  var pricesSubscription = client.subscribe('/fx/prices', pricesCallback);
}


// here we collect all the data for the prices based on the uniqueness of the name
var pricesData = {};

/*
  Callback for the prices data gets invoke when ever there is a check in the data
*/
function pricesCallback(message) {
  if (message.body) {
    let data = JSON.parse(message.body);
    pricesData[data.name] = data; //Adding the data if not present or updating it if it's present
    formatTableData(pricesData); // called a function to format the table data
    setSparkLineData(data); // called the function to set the spark line data
  }
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message);
})

// an interval is to draw the spark line which will be invoke on every second
setInterval(drawSparkLine,1000);