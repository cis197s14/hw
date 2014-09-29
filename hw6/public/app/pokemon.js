/*global define */
define(function (require) {
  'use strict';

  var $         = require('jquery')
    , Backbone  = require('backbone');

  var App       = require('models/app').App
    , AppView   = require('views/app').AppView
    , globals   = require('utils').globals;

  var DIMENSIONS  = globals.BUILDER_DIMENSIONS
    , MAP_SIZE    = globals.VIEWABLE_MAP_SIZE;

  // --------------------------------------------------------------------------

  var app = new App()
    , appView;

  // Init AppView
  // --------------------------------------------------------------------------

  // Only start application once maps are loaded from server
  app.once('ready', function () {
    // Ensure DOM ready
    $(function () {
      app.set('selectedMap', 'default');
      appView = new AppView({ model: app });

      $('body').append(appView.$el);
      appView.render();

      Backbone.history.start();
    });
  });


  // Router
  // --------------------------------------------------------------------------

  var Router = Backbone.Router.extend({

    routes: {

      'build/:mapName': 'build'

    , 'play': 'defaultPlay'

    , 'play/:mapName/r:row/c:col': 'play'

    , 'reset': 'reset'

    , 'new/:mapName': 'newMap'

    }

    /*
     * Constructs a route path of the form 'play/:mapName/r:row/c:col' based on
     * the currently selected map and the provided row / col parameters.
     */
  , _getPlayRoute: function (r, c) {
      var mapName = app.get('selectedMap');
      return 'play/' + mapName + '/r' + (r || 0) + '/c' + (c || 0);
    }

    // Route handlers
    // ---------------------------------------------------

  , build: function (mapName) {
      app.set('selectedMap', mapName);
      appView.showBuildView();
    }

  , defaultPlay: function () {
      // Create a reasonable visible map area based on player location
      var player  = app.get('player')
        , r       = player.get('row') - globals.VIEWABLE_MAP_SIZE / 2
        , c       = player.get('col') - globals.VIEWABLE_MAP_SIZE / 2;

      if (r < 0) { r = 0; }
      if (c < 0) { c = 0; }

      var newRoute = this._getPlayRoute(r, c);

      this.navigate(newRoute, {
        trigger: true
      , replace: true
      });
    }

  , play: function (mapName, row, col) {
      app.set('selectedMap', mapName);

      row = parseInt(row, 10);
      col = parseInt(col, 10);

      // Visible map bounds checking
      var rowStart  = Math.min(DIMENSIONS.height - MAP_SIZE, row)
        , rowEnd    = rowStart + MAP_SIZE
        , colStart  = Math.min(DIMENSIONS.width - MAP_SIZE, col)
        , colEnd    = colStart + MAP_SIZE;

      var visibleMap = {
        row: { start: rowStart , end: rowEnd }
      , col: { start: colStart , end: colEnd }
      };

      app.get('player').set('visibleMap', visibleMap);
      appView.showPlayView();
    }

  , reset: function () {
      app.get('builder').resetTiles();
      this.navigate('build/' + app.get('selectedMap'), {
        trigger: true
      , replace: true
      });
    }

  , newMap: function (mapName) {
      /*
       * TODO:
       *  - generate a new map model
       *  - add this model to the MapStorage collection & save it to the server
       *  - notify the App and Builder models of the new map model
       *  - show the new map in the UI's map list
       *  - navigate to the builder view for this map
       *
       * Implement this functionality last. It is recommended that you delegate
       * some of these actions to the relevant application models that might
       * execute them.
       */
    }

    // Other routing functions
    // ---------------------------------------------------

  , navigateMap: function (params) {
      var newRoute  = this._getPlayRoute(params.row, params.col);

      this.navigate(newRoute, {
        trigger: true
      , replace: true
      });
    }

  });


  // Initialize app
  // --------------------------------------------------------------------------

  var router = new Router();

  // Give the App model a reference to the router
  app.set('router', router);

  app.get('player').on('shiftMap', router.navigateMap, router);

});
