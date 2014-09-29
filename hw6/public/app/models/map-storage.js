/*global define, window */
define(function (require, exports) {
  'use strict';

  var Backbone  = require('backbone');

  exports.MapStorage = Backbone.Collection.extend({

    // API is hosted on the same server that serves this client application
    url: function (mapName) {
      /*
       * TODO: implement this versatile url-generating function. If a mapName is
       * provided, this should return the server route you would hit to
       * save a map (with a POST request). Otherwise, generate the server route
       * that GETs saved maps.
       *
       * Hint: you can get the current hostname and port (e.g.,
       * http://localhost:3000) with `window.location.origin`.
       */
    }

  , initialize: function () {
      /*
       * TODO: fetch this collection's data from the server such that it
       * triggers the 'reset' event.
       */
    }

  , saveMap: function (mapModel) {
      /*
       * TODO: use a jQuery AJAX function to save the given mapModel (a
       * Backbone.Model with 'name' and 'tiles' attributes) to the server.
       */
    }

  });

});
