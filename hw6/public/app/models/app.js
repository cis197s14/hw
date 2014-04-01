/*global define */
define(function (require, exports) {
  'use strict';

  var Backbone    = require('backbone')
    , Builder     = require('models/builder').Builder
    , Player      = require('models/player').Player
    , MapStorage  = require('models/map-storage').MapStorage
    , globals     = require('utils').globals;

  var DIMENSIONS  = globals.BUILDER_DIMENSIONS;

  exports.App = Backbone.Model.extend({

    defaults: function () {
      var builder = new Builder({
            app: this
         })
        , player  = new Player({
            map:        builder
          , dimensions: DIMENSIONS
          , visibleMap: {
              row: { start: 0, end: DIMENSIONS.height }
            , col: { start: 0, end: DIMENSIONS.width  }
            }
          })
        , mapStorage = new MapStorage();

      return {
        mapStorage:   mapStorage
      , builder:      builder
      , player:       player
      };
    }

  , initialize: function () {
      var mapStorage = this.get('mapStorage');

      /*
       * Keep map model in sync with selected map
       */
      this.on('change:selectedMap', function () {
        var mapName = this.get('selectedMap');
        this.set('mapModel', mapStorage.findWhere({ name: mapName }));
      });

      /*
       * Propagate map storage reset event for ease of use
       */
      this.listenTo(mapStorage, 'reset', function () {
        this.trigger('ready');
      });
    }

  });

});
