/*
 * Homework 1 (CIS 197)
 * Finger Exercises
 * ---------------------------
 *
 * The following code stubs are incomplete. Your job is to complete the
 * functions and achieve the desired functionality described in the comments.
 * Please don't change the names of given functions and object properties, as
 * this will make grading homework slower and more difficult.
 *
 * While completing this assignment, be sure to use Mozilla Developer Network's
 * [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
 */
(function () {

  /*
   * ==========================================================================
   * Exercise 1
   *
   * In this exercise we're going to augment the built-in `Array` methods with
   * some useful ones of our own.
   *
   * ==========================================================================
   */

  var arrayMethods = {
    /*
    * Sum all the elements in the array and return the total. Throw an error if
    * an element isn't a Number.
    */
    sum: function (arr) {

    },

    /*
    * Remove a given element and return the new / modified array.
    */
    remove: function (arr, item) {

    },

    /*
    * Find duplicates in an array (test for equality using `===`). Return an
    * array containing them all.
    */
    findDuplicates: function (arr) {

    }
  };

  /*
   * ==========================================================================
   * Exercise 2
   *
   * Create an object called `cashRegister` which scans items and keeps track of
   * a running total based on the given price list.
   * ==========================================================================
   */

  var priceList = {
    eggs: 2.50,
    milk: 3.00,
    bread: 2.75,
    orangeJuice: 4.25,
    chocolate: 1.50
  };

  var cashRegister = {

    total: undefined,

    lastTransaction: undefined,

    /*
     * Update the register based on the current item to be scanned.
     *
     * @param item      (String) name of the item to be scanned
     * @param quantity  (Number) how many of this item
     */
    scan: function (item, quantity) {

    },

    /*
     * Undo the last transaction. This method may only work once per
     * transaction; you don't need to keep a history of all transactions.
     */
    voidLastTransaction: function () {

    },

    /*
     * Discount the current total (for a coupon or employee discount).
     *
     * @param percentage  (Number) fractional discount percentage
     */
    applyDiscount: function (percentage) {

    },

    /*
     * Prepare the register for a new transaction.
     * Print out the total cost before resetting it.
     */
    completeTransaction: function () {

    }

  };


  /*
   * ==========================================================================
   * Exercise 3
   *
   * The Towers of Hanoi problem is a classic puzzle in which you are presented
   * with three pegs. There is a stack of discs of increasing size on one peg.
   * Your job is to determine the series of disc moves (you can only move one
   * disc at a time) that will move the entire stack to another peg. You are
   * only allowed to move a disk onto another one that is of greater size.
   * See * [this image](http://upload.wikimedia.org/wikipedia/commons/0/07/Tower_of_Hanoi.jpeg).
   *
   * Your solution should output tower moves as a string with newlines, in the
   * following form (if 'A', 'B', and 'C' were the peg names):
   *
   * Move disc 1 from A to B
   * Move disc 2 from A to C
   * ...
   *
   * ==========================================================================
   */

  /*
   * Return a string representing the solution to a specified Towers of Hanoi
   * problem.
   *
   * @param n   (Number) number of discs
   * @param src (String) name of the source peg
   * @param dst (String) name of the destination peg
   * @param aux (String) name of the auxiliary (third) peg
   */
  var towersOfHanoi = function (n, src, dst, aux) {

  };


  /*
   * NOTE: don't change this code.
   *
   * Export solution as a module.
   */
  module.exports = {
    arrayMethods: arrayMethods,
    cashRegister: cashRegister,
    towersOfHanoi: towersOfHanoi
  };

})();
