#js-set
___

####A simple, tested library implementing the set data structure in JavaScript
___

####Getting started is easy:

### `new JsSet(hashFunction);`
    - Initializes an empty set. You can provide a custom hashFunction as an argument to the constructor--if no hashFunction is given, then it defaults to JSON.stringify.
### `get(value)`
    - Gets the given value from the set if it exists. Else returns undefined.
### `add({...values})`
    - Variadic function that adds the given values to the set.
### `getSet()`
    - Simple helper function which returns the set object
### `size()` or `cardinality()`
    - Returns the amount of elements in the set
### `remove(element)`
    - Removes the given element from the set. Returns true if the element was removed, else returns false if the element didn't exist.
### `toArray()`
    - Converts the set into an array of elements and returns the array
### `isEmpty()`
    - Returns true if the set is empty (has no elements in it), else returns false.
### `isInSet(element)`
    - Returns true if the given element is the set, else returns false.
### `iterate(callback, context)`
    - Iterates over the elements in the set invoking the callback for each element. The callback function takes optional arguments value, index. The second argument of iterate defines the function context of the callback function when invoked. 
### `some(callback, context)`
    - Iterates over the elements in the set using the given callback. If the callback returns a truthy value then the 'some' function immediately returns true, else it returns false. The callback function takes optional arguments value, index. The second argument of some defines the function context of the callback function when invoked. 
### `union(set2)`
    - Modifies the current set to be the union of itself and the given set--'set2'. Returns this       
      modified set to make method chainable.
### `getSmallerSet(set2)`
    - Compares this set with set2 and returns the smaller set. If equal in size, returns set2.
### `intersection(set2)`
    - Returns a new set containing the intersection between this set and the set--'set2'
### `difference(set2)`
    - Modifies current set to be the diffference between this set and the set--'set2'. Returns this modified set to make method chainable. 
### `subset(subset)`
    - Returns true if subset is a subset of this set, else returns false.
### `pop()`
    - Removes and returs a random element from the set.
