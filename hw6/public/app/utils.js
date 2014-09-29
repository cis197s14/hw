/*global define */
'use strict';
define(function (require, exports) {

  var _ = require('underscore');

  var globals = {
    MAP_SELECTOR:           '#map'
  , APP_TMPL_SELECTOR:      '#app-template'
  , CANVAS_TMPL_SELECTOR:   '#canvas-template'
  , BUILDER_TMPL_SELECTOR:  '#builder-template'
  , SWATCH_TMPL_SELECTOR:   '#swatch-template'
  , PLAYER_TMPL_SELECTOR:   '#player-template'
  , TILE_SIZE:              25
  , VIEWABLE_MAP_SIZE:      10
  , BUILDER_DIMENSIONS:     { width: 30, height: 20 }
  , DEFAULT_MAP_NAME:       'default'
  , LOCALSTORAGE_KEY:       'pokemonTiles'
  };


  var utils = {

    getSwatchName: function (el) {
      var classList = el.classList || el.get(0).classList;

      return _.chain(classList)
              .difference(['selected', 'swatch', 'tile'])
              .first()
              .value();
    }

  , canvasToPixelUnits: function (numTiles) {
      return numTiles * globals.TILE_SIZE;
    }

  };

  exports.globals = globals;
  exports.utils   = utils;

});
