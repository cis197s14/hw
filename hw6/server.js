/*globals module, exports */
(function () {
  'use strict';

  var express     = require('express')
    , mapStorage  = require('./map-storage')
    , app         = express();

  // Application middleware
  // --------------------------------------------------------------------------
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.errorHandler());

  // Serve static files (client application)
  app.use(express.static(__dirname + '/public'));


  // API Routes
  // --------------------------------------------------------------------------

  /*
   * Return the JSON representation of all stored maps
   */
  app.get('/api/maps', function (req, res) {
    /*
     * TODO:
     *
     * Use the `mapStorage` module to grab the stored maps from disk. Note that
     * `getMaps` is an asynchronous function that invokes a given callback when
     * it finishes reading from the file system. It can also throw errors; in
     * this case, you should send back a server response with a status code of
     * 500.
     */
  });

  /*
   * Save a map to the data store
   */
  app.post('/api/maps/:name', function (req, res) {
    /*
     * TODO:
     *
     * Use the `mapStorage` module to save a map with the given name to a JSON
     * file. The map tiles are passed in the request body.
     *
     * Note that mapStorage's `saveMap` function might throw an error if it
     * fails. If it does, send back a server response with a status code of 500.
     * Otherwise, send a normal response message signifying success.
     *
     */
  });

  // Start server!
  // --------------------------------------------------------------------------
  var server = app.listen(3000);
  console.log('Express app listening on port %d', server.address().port);

  module.exports = app;

}());
