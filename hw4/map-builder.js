/*global $, _, Backbone, Mousetrap */
(function () {
  'use strict';

  // Globals
  // -------------------------------------------------------------------------

  var LEFT_MOUSE_BUTTON = 1,
      TILE_SIZE = 25,
      DEFAULT_SWATCH = 'grass';

  var SWATCHES = [
    'grass',
    'flowers-red',
    'flowers-orange',
    'flowers-blue',
    'weed',
    'weed-4x',
    'weed-small',
    'weed-2x',
    'sand-patch',
    'box',
    'fence-nw',
    'fence-n',
    'fence-ne',
    'fence-w',
    'field',
    'fence-e',
    'fence-sw',
    'fence-s',
    'fence-se',
    'mountain-nw',
    'mountain-n',
    'mountain-ne',
    'mountain-w',
    'plateau',
    'mountain-e',
    'mountain-sw',
    'mountain-s',
    'mountain-se',
    'cave',
    'rock-1',
    'rock-2',
    'sign',
    'tree-1',
    'tree-2',
    'planter',
    'water-nw',
    'water-n',
    'water-ne',
    'water-w',
    'water',
    'water-e',
    'water-sw',
    'water-s',
    'water-se',
    'water-nw-inverse',
    'water-ne-inverse',
    'water-sw-inverse',
    'water-se-inverse',
    'sand',
    'sand-nw',
    'sand-n',
    'sand-ne',
    'sand-w',
    'sand-e',
    'sand-sw',
    'sand-s',
    'sand-se',
    'sand-nw-inverse',
    'sand-ne-inverse',
    'sand-sw-inverse',
    'sand-se-inverse'
  ];

  var TERRAIN_SWATCHES = [
    'grass', 'flowers-red', 'flowers-orange', 'flowers-blue', 'weed', 'weed-4x',
    'weed-small', 'weed-2x', 'field', 'sand-patch', 'sand', 'sand-nw', 'sand-n',
    'sand-ne', 'sand-w', 'sand-e', 'sand-sw', 'sand-s', 'sand-se',
    'sand-nw-inverse', 'sand-ne-inverse', 'sand-sw-inverse', 'sand-se-inverse'
  ];

  // Utils
  // -------------------------------------------------------------------------

  /*
   * Given a DOM element, look at its class list to find the relevant swatch
   * name. Should work for palette swatches _and_ map tiles. A selected swatch
   * in the palette looks like:
   *
   *    <div class="selected swatch grass"></div>
   * 
   * A map tile looks like:
   *
   *    <div class="tile swatch grass"></div>
   *
   * If either of these elements was passed to this function, the returned
   * result should be "grass".
   */
  var getSwatchName = function (el) {
    // TODO
  };

  /*
   * Determines how many pixels wide (or tall) a given number of map tiles are.
   */
  var canvasToPixelUnits = function (numTiles) {
    // TODO
  };



  // -------------------------------------------------------------------------
  // Models
  // -------------------------------------------------------------------------

  var Builder = Backbone.Model.extend({

    defaults: function () {
      return {
        width: 10, 
        height: 10,
        selectedSwatch: DEFAULT_SWATCH
      };
    },

    initialize: function () {
      this.set('tiles', this.generateTiles());
    },

    /*
     * TODO: generateTiles, updateTileSwatch, hasTerrain
     */

  });


  var Player = Backbone.Model.extend({

    defaults: {
      row: 0,
      col: 0,
      orientation: 'right'
    },

    /*
     * TODO: moveUp, moveRight, moveLeft, moveDown
     */

    isTerrain: function (row, col) {
      var builder = this.get('builderModel');
      return builder.hasTerrain(row, col);
    }

  });




  // -------------------------------------------------------------------------
  // Views
  // -------------------------------------------------------------------------

  var PaletteView = Backbone.View.extend({

    /*
     * TODO: events
     */

    initialize: function () {
      this.swatchTmpl = _.template($('#swatch-template').html());
    }

    /*
     * TODO: render
     */

  });


  var BuilderView = Backbone.View.extend({

    /*
     * TODO: events
     */

    initialize: function () {
      this.canvasTmpl = _.template($('#canvas-template').html());
      this.$el = $('#map-builder');
    },

    render: function () {
      this._renderCanvas(this.$('.canvas'));
      this._renderPalette(this.$('.palette'));
    }

    /*
     * TODO: _renderCanvas, _renderPalette
     */

    // ----------------------------------------------

    /*
     * TODO: event handlers
     */

  });


  var PlayerView = Backbone.View.extend({

    initialize: function () {
      this.tmpl = _.template($('#player-template').html());
    }

    /*
     * TODO: render, bind keypress listeners
     */

  });


  // -------------------------------------------------------------------------
  // DOM Ready
  // -------------------------------------------------------------------------


  $(function () {

    var dimensions = {
          width: 30,
          height: 10
        },
        builder     = new Builder(dimensions),
        builderView = new BuilderView({ model: builder });

    builderView.render();

    var player = new Player({
          builderModel: builder,
          dimensions: dimensions
        })
      , playerView = new PlayerView({ model: player });

    playerView.setElement(builderView.$el);
    playerView.render();

  });


}());
