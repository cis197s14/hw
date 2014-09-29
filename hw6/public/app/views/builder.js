/*global define */
define(function (require, exports) {
  'use strict';

  var _         = require('underscore')
    , $         = require('jquery')
    , Backbone  = require('backbone')
    , globals   = require('utils').globals
    , utils     = require('utils').utils;


  // Globals
  // -------------------------------------------------------------------------

  var LEFT_MOUSE_BUTTON = 1;

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



  // -------------------------------------------------------------------------

  var PaletteView = Backbone.View.extend({

    // These event callback methods get their context 'this' bound to the
    // PaletteView. Convenient!
    events: {
      'click .swatch': 'onSelectSwatch'
    }

  , initialize: function () {
      this.swatchTmpl = _.template($(globals.SWATCH_TMPL_SELECTOR).html());
    }

  , render: function () {
      var that = this
        , $swatchesList = this.$('ul')
        , compiledSwatches = _.map(SWATCHES, function (name) {
            return that.swatchTmpl({ name: name });
          });

      $swatchesList.html(compiledSwatches.join(''));
      this.$swatches = this.$('li');

      return this;
    }

  , onSelectSwatch: function (e) {
      this.$swatches.removeClass('selected');
      $(e.target).addClass('selected');

      this.model.set('selectedSwatch', utils.getSwatchName(e.target));
    }

  });


  exports.BuilderView = Backbone.View.extend({

    events: {
      'mousedown .tile':  'onMouseDownTile'
    , 'mouseenter .tile': 'onMouseEnterTile'
    , 'mouseout .tile':   'onMouseOutTile'
    }

  , initialize: function () {
      this.tmpl = _.template($(globals.BUILDER_TMPL_SELECTOR).html());
      this.canvasTmpl = _.template($(globals.CANVAS_TMPL_SELECTOR).html());
    }

  , render: function () {
      var compiledTmpl = this.tmpl(this.model.toJSON());
      this.$el.html(compiledTmpl);

      this._renderCanvas(this.$('.canvas'));
      this._renderPalette(this.$('.palette'));
    }

  , _renderPalette: function ($palette) {
      this.paletteView = new PaletteView({ model: this.model });
      this.paletteView.setElement($palette);
      this.paletteView.render();

      $palette.css({
        width: utils.canvasToPixelUnits(this.model.get('width'))
      });
    }

  , _renderCanvas: function ($canvas) {
      var compiledTmpl = this.canvasTmpl(this.model.get('map').toJSON());
      $canvas.html(compiledTmpl);
    }


    // Event handlers
    // ------------------------------------------------

  , onMouseDownTile: function (e) {
      var $tile       = $(e.target)
        , prevPainted = utils.getSwatchName(e.target)
        , swatch      = this.model.get('selectedSwatch');

      $tile.data('painted', swatch);
      $tile.removeClass(prevPainted).addClass(swatch);

      this.model.updateTileSwatch($tile.data());
    }

  , onMouseEnterTile: function (e) {
      var $tile       = $(e.target)
        , painted     = utils.getSwatchName(e.target)
        , swatch      = this.model.get('selectedSwatch');

      if (e.which === LEFT_MOUSE_BUTTON) {
        // dragging action
        this.onMouseDownTile(e);
      }
      else {
        $tile.data('painted', painted);
        $tile.removeClass(painted).addClass(swatch);
      }
    }

  , onMouseOutTile: function (e) {
      var $tile   = $(e.target)
        , painted = $tile.data('painted')
        , current = utils.getSwatchName(e.target);

      if (current !== painted) {
        $tile.removeClass(current).addClass(painted);
      }
    }

  });

});

