/**
 * Created by Mahir Shah on 9/22/14.
 */
var JsSet = (function (undefined) {
    'use strict';

    /**
     * Constructor for Set and scope for private methods
     *
     * @param hashFunction
     * @constructor
     */
    function Set(hashFunction) {
        //custom hash function or default to JSON.stringify
        this.hashFunction = hashFunction || JSON.stringify;
        //initialize private variables: empty set with length 0
        var _length = 0,
            _set = {};

        /**
         * Simple function which finds a value in the set if it exists and returns undefined if not in the set
         *
         * @param value
         * @returns {*}
         */
        this.get = function (value) {
            return _set[this.hashFunction(value)];
        };

        /**
         * Helper function to return the set object
         *
         * @returns {{}}
         */
        this.getSet = function () {
            return _set;
        };

        /**
         * Function which takes in a list of values to put into the set and adds them if they don't exist.
         *
         * @param {...value} var_args
         */
        this.add = function () {
            function addOne(value) {
                if (this.get(value) === undefined) {
                    _length++;
                    _set[this.hashFunction(value)] = value;
                }
            }

            Array.prototype.forEach.call(arguments, function (val) {
                addOne.call(this, val);
            }, this);
        };

        /**
         * returns the number of items in the set
         *
         * @returns {number}
         */
        this.size = function () {
            return _length;
        };

        /**
         * Deletes a given element from the set if it exists. Returns true if the element was deleted, returns false if
         * the element was not found in the set.
         *
         * @param element
         */
        this.remove = function (element) {
            if (this.isInSet(element)) {
                delete _set[this.hashFunction(element)];
                _length -= 1;
                return true;
            }
            return false;
        };

        /**
         * For debuging: prints the set out to the console
         */
        this.print = function () {
            console.log(_set);
        };

        /**
         * Converts the set to an array
         *
         * @returns {Array}
         */
        this.toArray = function () {
            var array = [];

            for (var element in _set) {
                if (_set.hasOwnProperty(element))
                    array.push(_set[element])
            }

            return array;
        }
    }

    /**
     * Alias function for size
     *
     * @returns {number}
     */
    Set.prototype.cardinality = function () {
        return this.size();
    };

    /**
     * Returns a boolean checking if the set is empty
     *
     * @returns {boolean}
     */
    Set.prototype.isEmpty = function () {
        return !this.size();
    };

    /**
     * Returns a boolean checking if a given element is in the set
     *
     * @param element
     * @returns {boolean}
     */
    Set.prototype.isInSet = function (element) {
        return this.get(element) !== undefined;
    };

    /**
     * Iterates over the elements in the set using a provided function with optional arguments value, index
     *
     * @param fn - callback to be invoked each iteration, with parameters value and index
     * @param self - this function context for callback
     */
    Set.prototype.iterate = function (fn, self) {
        var set = this.getSet(),
            index = 0;

        for (var element in set) {
            fn.call(self, set[element], index);
            index += 1;
        }
    };

    /**
     * Iterates over the elements in the set using fn callback, if callback is true the function immediately returns true
     * else it returns false. The callback is invoked with value and index parameters.
     *
     * @param fn
     * @param self
     * @returns {boolean}
     */
    Set.prototype.some = function (fn, self) {
        var set = this.getSet(),
            index = 0;

        for (var element in set) {
            if (fn.call(self, set[element], index))
                return true;
            index += 1;
        }

        return false;
    };

    /**
     * Returns the union set between this set and set2
     *
     * @param set2
     * @returns {JsSet}
     */
    Set.prototype.union = function (set2) {
        set2.iterate(function (val) {
            this.add(val);
        }, this);
        return this; //return this to make it chainable
    };

    /**
     * Returns the smaller set between this and set2
     *
     * @param set2
     * @returns {JsSet}
     */
    Set.prototype.getSmallerSet = function (set2) {
        return this.size() <= set2.size() ? this : set2;
    };

    /**
     * Returns the intersection set between this and set2
     *
     * @param set2
     * @returns {Set}
     */
    Set.prototype.intersection = function (set2) {
        //initialize new set to return intersection
        var intersectionSet = new Set(this.hashFunction),
            smallerSet = this.getSmallerSet(set2), //find the smaller set to iterate over
            largerSet = smallerSet === this ? set2 : this;

        smallerSet.iterate(function (val) {
            if (largerSet.isInSet(val)) {
                intersectionSet.add(val);
            }
        });

        return intersectionSet;
    };

    /**
     * Return the difference set between this and set2
     *
     * @param set2
     * @returns {JsSet}
     */
    Set.prototype.difference = function (set2) {
        set2.iterate(function (val) {
            this.remove(val);
        }, this);
        return this; //return this to make it chainable
    };

    /**
     * Checks if subset is subset of this
     *
     * @param subset
     */
    Set.prototype.subset = function (subset) {
        return subset.some(function (val) {
            return this.isInSet(val);
        }, this);
    };

    /**
     *
     * @returns {*}
     */
    Set.prototype.pop = function () {
        var set = this.getSet(),
            keys = Object.keys(set);
        var random = set[keys[Math.floor(Math.random() * keys.length)]];
        this.remove(random);
        return random;
    };


    return Set;
})();


