# Running the code:

Initialize dependencies by running `npm install` and `bower install`.

**Serving the code**

If you have [node.js](https://nodejs.org/en/) installed, run `node static_server.js` and then visit [http://localhost:8888](http://localhost:8888) in your browser. If node.js is not installed, configure a server of choice to target the project.

# Testing

Install Karma `sudo npm install -g karma-cli`. Run `karma start` and connect to the service by visiting the supplied address in a browser. Once connected to the server, use `karma run` in another terminal to run the tests.

----

# The problem:

A movie theatre sells the three concession stand items listed below:

- Popcorn  = $3
- Snickers = $4 (or five for the price of three)
- Soda     = $2

Implement a web application for the movie theatre that allows a user to add the above items to a shopping cart and calculates the total for the given collection of items. For example, the following basket should total up to $23.

- 3x Popcorn
- 5x Snickers
- 1x Soda

Deliver your solution as a Javascript web application using a modern client-side framework such as Angular, Ember, Backbone, etc. Your solution should be able to run in Chrome.

Consider testability, documentation, and other good coding practices in your solution. Your application can run exclusively in the browser and doesn’t need to have a server-side component (no model).

----

*Additional optional challenges:*

1. Allow for adding new items at runtime without restarting/rebuilding/refreshing the application.
