/*global define */
define(function (require, exports) {
  'use strict';

  var _         = require('underscore')
    , $         = require('jquery')
    , Backbone  = require('backbone')
    , Mousetrap = require('mousetrap')
    , globals   = require('utils').globals
    , utils     = require('utils').utils;


  exports.PlayerView = Backbone.View.extend({

    initialize: function () {
      this.tmpl = _.template($(globals.PLAYER_TMPL_SELECTOR).html());
      this.model.on('change:row change:col', this._refresh.bind(this));
    },

    render: function (refresh) {
      var visible = this.model.get('visibleMap')
        , row     = this.model.get('row') - visible.row.start
        , col     = this.model.get('col') - visible.col.start;

      var compiledTmpl = this.tmpl({
        top:          utils.canvasToPixelUnits(row)
      , left:         utils.canvasToPixelUnits(col)
      , orientation:  this.model.get('orientation')
      });

      // this.$el is the same as mapView.$el
      this.$el.prepend(compiledTmpl);

      if (!refresh) {
        this._bindKeypressListeners();
      }
    },

    _refresh: function () {
      this.$('.player').remove();
      this.render(true);
    },

    keypressEvents: {
      w: 'moveUp'
    , a: 'moveLeft'
    , s: 'moveDown'
    , d: 'moveRight'
    },

    _bindKeypressListeners: function () {
      // Some function binding & juggling
      function bindListener (fn, key) {
        var handler = this.model[fn].bind(this.model);
        Mousetrap.bind(key, handler, 'keydown');
      }

      _(this.keypressEvents).each(bindListener.bind(this));
    }

  });


});
