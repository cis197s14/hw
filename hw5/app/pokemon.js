/*global $, _, Backbone, Mousetrap, window, POKEMON */
(function () {
  'use strict';



  // Initialize models
  // -------------------------------------------------------------------------

  POKEMON.dimensions = {
    width: 30,
    height: 30
  };

  POKEMON.builder = new POKEMON.Builder(POKEMON.dimensions);


  POKEMON.player = new POKEMON.Player({

    // TODO
    // (left blank to tailor to your Player model implementation)

  });






  // Router
  // --------------------------------------------------------------------------


  POKEMON.Router = Backbone.Router.extend({

    // TODO: routes for map building, playing, and resetting

  });







  POKEMON.router = new POKEMON.Router();

  Backbone.history.start();


}());
