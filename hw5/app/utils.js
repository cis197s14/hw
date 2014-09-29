/*global $, _, Backbone, Mousetrap, window, POKEMON */
(function () {
  'use strict';

  // Globals

  POKEMON.globals = {
    MAP_SELECTOR:           '#map',
    CANVAS_TMPL_SELECTOR:   '#canvas-template',
    BUILDER_TMPL_SELECTOR:  '#builder-template',
    SWATCH_TMPL_SELECTOR:   '#swatch-template',
    PLAYER_TMPL_SELECTOR:   '#player-template',
    TILE_SIZE:              25,
    VIEWABLE_MAP_SIZE:      10,
    LOCALSTORAGE_KEY:       'pokemonTiles'
  };


  // Utilities

  POKEMON.utils = {

    getSwatchName: function (el) {
      var classList = el.classList || el.get(0).classList;

      return _.chain(classList)
              .difference(['selected', 'swatch', 'tile'])
              .first()
              .value();
    },

    canvasToPixelUnits: function (numTiles) {
      return numTiles * POKEMON.globals.TILE_SIZE;
    }

  };

}());
