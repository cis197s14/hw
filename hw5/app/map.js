/*global $, _, Backbone, Mousetrap, window, POKEMON */
(function () {
  'use strict';

  // MapView
  // -------------------------------------------------------------------------

  POKEMON.MapView = Backbone.View.extend({

    className: 'canvas playing',

    initialize: function () {
      this.tmpl = _.template($(POKEMON.globals.CANVAS_TMPL_SELECTOR).html());
    },

    render: function (params) {


      // TODO: populate viewableTiles with only the currently viewable area. It
      // should still be a 2D array.


      var viewableTiles = [];


      var compiledTmpl = this.tmpl({ tiles: viewableTiles });
      this.$el.html(compiledTmpl);

      $(POKEMON.globals.MAP_SELECTOR).append(this.$el);
    }

  });


}());
