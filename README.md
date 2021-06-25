# Browser RUM Sample App

A simple browser application you can use to try out different features of [AppDynamics Browser Real User Monitoring](https://docs.appdynamics.com/latest/en/end-user-monitoring/browser-monitoring/browser-real-user-monitoring).

## Installation

You need a local webserver to run the app properly, one option is [browsersync](https://browsersync.io/):

```shell
browser-sync start --server --files .
```

## Usage

After starting the webserver you should be able to access the app via http://localhost:3000 in your browser.
You can now modify the code and [add the AppDynamics agent manually](https://docs.appdynamics.com/latest/en/end-user-monitoring/browser-monitoring/browser-real-user-monitoring/inject-the-javascript-agent/manual-injection-of-the-javascript-agent), or you can use the [ADRUM injector](http://bit.ly/adruminjector) to get started quickly.

For the ADRUM injector, use the following configuration for **Basic Settings**:

* Agent Location: https://cdn.appdynamics.com/adrum/adrum-latest.js
* ADRUM App Key: Your App Key
* URL Filter: localhost:3000

And start with the following configuration for **Agent Advanced Configuration JS**:

```javascript
(function(config){
    config.userEventInfo = {
        PageView: function() {
          debugger;
        },
        Ajax: function(context) {
          console.log(context);
        },
        VPageView: function() {
          debugger;
        }
      };
})(window["adrum-config"] || (window["adrum-config"] = {}));
```

## Challenges

You can now try to accomplish the following things without changing one line of the application code:

* Collect the product price and attach it as custom user data to the page beacon
* Collect the customer id and transaction id as custom user data for the /api/checkout AJAX call
* Create two virtual pages, for the "Cart Page" (after add to cart was clicked) and for "Checkout" (when the green message box is displayed)
* Create a custom metric that measures the time for processing the payment with "AppPaymanics"
* Collect the total price (and other properties) from the cart and add them to the virtual page beacon for "Cart Page"