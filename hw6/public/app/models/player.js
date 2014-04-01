/*global define */
define(function (require, exports) {
  'use strict';

  var Backbone  = require('backbone');

  var SHIFT_MAP_PADDING = 2;

  // -------------------------------------------------------------------------

  exports.Player = Backbone.Model.extend({

    defaults: {
      row: 0
    , col: 0
    , orientation: 'right'
    },

    isTerrain: function (row, col) {
      var builder = this.get('map');
      return builder.hasTerrain(row, col);
    },

    moveUp: function () {
      var r   = this.get('row') - 1
        , c   = this.get('col')
        , map = this.get('visibleMap');

      this.set('orientation', 'up');

      if (r > map.row.start - 1 && this.isTerrain(r, c)) {
        this.set('row', r);
      }

      // Shift visible map
      if (r - map.row.start < SHIFT_MAP_PADDING && r > 0) {
        this.trigger('shiftMap', {
          row: r - 1
        , col: map.col.start
        });
      }
    },

    moveLeft: function () {
      var r   = this.get('row')
        , c   = this.get('col') - 1
        , map = this.get('visibleMap');

      this.set('orientation', 'left');

      if (c > map.col.start - 1 && this.isTerrain(r, c)) {
        this.set('col', c);
      }

      // Shift visible map
      if (c - map.col.start < SHIFT_MAP_PADDING && c > 0) {
        this.trigger('shiftMap', {
          row: map.row.start
        , col: c - 1
        });
      }
    },

    moveDown: function () {
      var r   = this.get('row') + 1
        , c   = this.get('col')
        , map = this.get('visibleMap');

      this.set('orientation', 'down');

      if (r < map.row.end && this.isTerrain(r, c)) {
        this.set('row', r);
      }

      // Shift visible map
      if (map.row.end - r < SHIFT_MAP_PADDING && r <= this.get('dimensions').height) {
        this.trigger('shiftMap', {
          row: map.row.start + SHIFT_MAP_PADDING - 1
        , col: map.col.start
        });
      }
    },

    moveRight: function () {
      var r   = this.get('row')
        , c   = this.get('col') + 1
        , map = this.get('visibleMap');

      this.set('orientation', 'right');

      if (c < map.col.end && this.isTerrain(r, c)) {
        this.set('col', c);
      }

      // Shift visible map
      if (map.col.end - c < SHIFT_MAP_PADDING && c <= this.get('dimensions').width) {
        this.trigger('shiftMap', {
          row: map.row.start
        , col: map.col.start + SHIFT_MAP_PADDING - 1
        });
      }
    }

  });


});

