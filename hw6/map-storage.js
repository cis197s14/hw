/*globals module, exports */
(function () {
  'use strict';

  var _     = require('underscore')
    , fs    = require('fs')
    , RSVP  = require('rsvp');

  var MAPS_DIRECTORY = './maps/';

  /*
   * Check if a given filename ends in '.json'
   */
  function isJSONFile (name) {
    return !!(name.match(/\.json$/));
  }

  /*
   * Promise wrapper for fs.readFile
   */
  function readFilePromise (name) {
    return new RSVP.Promise(function (resolve, reject) {
      fs.readFile(name, function (err, contents) {
        if (err) {
          reject(err);
        } else {
          resolve(contents);
        }
      });
    });
  }

  /*
   * Take an array of JSON file contents and generate data to send to the
   * client. When mapped over a list of file contents, the resulting data looks
   * like:
   *
   * [
   *   { name: 'default', tiles: [...] },
   *   { name: 'foo', tiles: [...] },
   *   ...
   *  ]
   */
  function buildMapsCollection (mapFiles) {
    return _.map(mapFiles, function (data, fileName) {
      return {
        name:   fileName.split('.json')[0]
      , tiles:  JSON.parse(data)
      };
    });
  }

  // --------------------------------------------------------------------------

  module.exports = {

    /*
     * Returns a JSON object representing the currently stored maps.
     */
    getMaps: function (cb) {
      fs.readdir(MAPS_DIRECTORY, function (err, mapNames) {
        if (err) { throw err; }

        var mapPromises = {};

        _.chain(mapNames).filter(isJSONFile).each(function (fileName) {
          mapPromises[fileName] = readFilePromise(MAPS_DIRECTORY + fileName);
        });

        RSVP.hash(mapPromises)
          .then(buildMapsCollection)
          .then(cb)
          .catch(function (reason) { throw reason; });
      });
    }

    /*
     * Saves a given map to the persistent data store (currently .json files).
     */
  , saveMap: function (name, tiles) {
      if (_.isUndefined(name) || _.isUndefined(tiles)) {
        throw new Error('Invalid parameters to save map.');
      }

      fs.writeFile(MAPS_DIRECTORY + name + '.json', JSON.stringify(tiles), function (err) {
        if (err) { throw err; }
      });
    }

  };

}());
