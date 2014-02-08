(function () {

  /*
   * ---------------------
   * A note about imports:
   * ---------------------
   *
   * This is an example of how modules work in node.js. If you have installed
   * a module via npm, you can simply 'require' it with the following syntax and
   * its exports will be returned from the require() call.
   *
   */
  var sax = require('sax'),
      IS_STRICT = false;


  // -------------------------------------------------------------------------
  // XMLElement
  //
  // Represents a node in the document tree.
  // -------------------------------------------------------------------------

  var XMLElement;

  

  // -------------------------------------------------------------------------
  // XMLDocument <: XMLElement
  //
  // Represents the entire document tree.
  // -------------------------------------------------------------------------

  var XMLDocument;




  // -------------------------------------------------------------------------
  // XMLDocumentBuilder
  //
  // Takes an XML string and a callback to be executed when the XML Document is
  // fully built.
  // -------------------------------------------------------------------------

  var XMLDocumentBuilder = function (xmlString, callback) {
    xmlString && xmlString.toString().trim();

    if (xmlString == null) {
      throw new Error("No XML to parse.");
    }

    this.input = xmlString;
    this.parser = sax.parser(IS_STRICT);

    /*
     * TODO: add instance variables here to help with parsing.
     */

    this.completedCallback = callback;
    this.bindParserHandlers();
    this.parser.write(this.input).close();
  };

  XMLDocumentBuilder.prototype.bindParserHandlers = function () {

    this.parser.onerror = function (e) {
      throw e;
    };

    this.parser.onopentag = function (node) {
      // TODO
    };

    this.parser.onattribute = function (attr) {
      // TODO
    };

    this.parser.onclosetag = function () {
      // TODO
    };

    this.parser.ontext = function (t) {
      // TODO
    };

  };

  /*
   * TODO
   * This should be called at some point in one of the parser handlers to
   * indicate that parsing the entire document is complete.
   */
  XMLDocumentBuilder.prototype.complete = function () {
    this.completedCallback(this.doc);
  };


  // Testing methods
  // -------------------------------------------------------------------------

  // TODO
  // You are encouraged to test on more complex XML samples; we certainly will
  // when grading this assignment.
  var SAMPLE_XML = '<xml>Hello, <who name="world">world</who>!</xml>';

  var testModel = function () {
    var builder = new XMLDocumentBuilder(SAMPLE_XML, function (doc) {
      // This callback is invoked when the XML document model is fully built.

      console.log(doc);
    });
  };


  // Export module
  // -------------------------------------------------------------------------

  module.exports = {
    XMLElement: XMLElement
  , XMLDocument: XMLDocument
  };

})();
