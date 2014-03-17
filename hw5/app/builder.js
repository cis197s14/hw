/*global $, _, Backbone, Mousetrap, window, POKEMON */
(function () {
  'use strict';

  // Globals
  // -------------------------------------------------------------------------

  var LEFT_MOUSE_BUTTON = 1,
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
     * Generate a 2D matrix of map tiles based on a provided swatch name. If no
     * name is provided, use the model's currently selected swatch.
     */
    generateTiles: function (swatch) {
      var rows            = _.range(this.get('height')),
          cols            = _.range(this.get('width')),
          selectedSwatch  = swatch || this.get('selectedSwatch');

      return _.map(rows, function (row) {
        return _.map(cols, function (col) {
          return {
            row: row,
            col: col,
            swatch: selectedSwatch
          };
        });
      });
    },

    /*
     * Update a particular map tile to the currently selected swatch ("paint"
     * it).
     */
    updateTileSwatch: function (tileData) {
      var tile = this.get('tiles')[tileData.row][tileData.col];
      tile.swatch = this.get('selectedSwatch');
    },

    /*
     * Returns true if the map tile at the given [row, col] coordinate is
     * "terrain" (and not an "obstruction").
     */
    hasTerrain: function (row, col) {
      var tile = this.get('tiles')[row][col];
      return _.contains(TERRAIN_SWATCHES, tile.swatch);
    }

  });








  // Views
  // -------------------------------------------------------------------------

  var PaletteView = Backbone.View.extend({

    events: {
      'click .swatch': 'onSelectSwatch'
    },

    initialize: function () {
      this.swatchTmpl = _.template($(POKEMON.globals.SWATCH_TMPL_SELECTOR).html());
    },

    render: function () {
      var that = this
        , $swatchesList = this.$('ul')
        , compiledSwatches = _.map(SWATCHES, function (name) {
            return that.swatchTmpl({ name: name });
          });

      $swatchesList.html(compiledSwatches.join(''));
      this.$swatches = this.$('li');

      return this;
    },

    onSelectSwatch: function (e) {
      this.$swatches.removeClass('selected');
      $(e.target).addClass('selected');

      this.model.set('selectedSwatch', POKEMON.utils.getSwatchName(e.target));
    }

  });


  var BuilderView = Backbone.View.extend({

    events: {
      'mousedown .tile':  'onMouseDownTile',
      'mouseenter .tile': 'onMouseEnterTile',
      'mouseout .tile':   'onMouseOutTile'
    },

    initialize: function () {
      this.tmpl = _.template($(POKEMON.globals.BUILDER_TMPL_SELECTOR).html());
      this.canvasTmpl = _.template($(POKEMON.globals.CANVAS_TMPL_SELECTOR).html());
    },

    render: function () {
      var compiledTmpl = this.tmpl(this.model.toJSON());
      this.$el.html(compiledTmpl);

      this._renderCanvas(this.$('.canvas'));
      this._renderPalette(this.$('.palette'));

      $(POKEMON.globals.MAP_SELECTOR).append(this.$el);
    },

    _renderPalette: function ($palette) {
      this.paletteView = new PaletteView({ model: this.model });
      this.paletteView.setElement($palette);
      this.paletteView.render();

      $palette.css({
        width: POKEMON.utils.canvasToPixelUnits(this.model.get('width'))
      });
    },

    _renderCanvas: function ($canvas) {
      var compiledTmpl = this.canvasTmpl(this.model.toJSON());
      $canvas.html(compiledTmpl);
    },


    // Event handlers
    // ------------------------------------------------

    onMouseDownTile: function (e) {
      var $tile       = $(e.target)
        , prevPainted = POKEMON.utils.getSwatchName(e.target)
        , swatch      = this.model.get('selectedSwatch');

      $tile.data('painted', swatch);
      $tile.removeClass(prevPainted).addClass(swatch);

      this.model.updateTileSwatch($tile.data());
    },

    onMouseEnterTile: function (e) {
      var $tile       = $(e.target)
        , painted     = POKEMON.utils.getSwatchName(e.target)
        , swatch      = this.model.get('selectedSwatch');

      if (e.which === LEFT_MOUSE_BUTTON) {
        // dragging action
        this.onMouseDownTile(e);
      }
      else {
        $tile.data('painted', painted);
        $tile.removeClass(painted).addClass(swatch);
      }
    },

    onMouseOutTile: function (e) {
      var $tile   = $(e.target)
        , painted = $tile.data('painted')
        , current = POKEMON.utils.getSwatchName(e.target);

      if (current !== painted) {
        $tile.removeClass(current).addClass(painted);
      }
    }

  });















  // Exports
  // -------------------------------------------------------------------------

  POKEMON.Builder     = Builder;
  POKEMON.BuilderView = BuilderView;






}());


