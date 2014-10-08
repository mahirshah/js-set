/**
 * Created by Mahir on 9/22/14.
 */


QUnit.test("Tests", function (assert) {
    var set1 = new JsSet(),
        set2 = new JsSet();
    /**
     * Empty set tests
     */
    assert.equal(new JsSet().hashFunction, JSON.stringify);
    assert.equal(set1.get(1), undefined);
    assert.equal(set1.remove(5), false);
    assert.equal(set1.size(), 0);
    assert.equal(set1.isEmpty(), true);
    assert.equal(set1.isInSet(1), false);
    /**
     * Adding single element test
     */
    set1.add(1);
    assert.equal(set1.isEmpty(), false);
    assert.equal(set1.get(1), 1);
    assert.ok(set1.isInSet(1));
    assert.equal(set1.size(), 1);
    /**
     * Adding multiple elements
     */
    set2.add(1, 2, 3, 4, 5, 9, 1010, 7218);
    assert.ok(!set2.isEmpty());
    assert.equal(set2.get(1010), 1010);
    assert.ok(set2.isInSet(7218));
    assert.equal(set2.size(), 8);
    /**
     * Testing toArray
     */
    var set3 = new JsSet();
    assert.deepEqual(set3.toArray(), []);
    set3.add(1, 2, 3);
    assert.deepEqual(set3.toArray(), [1, 2, 3]);
    set3.add(4, 5, 6);
    assert.deepEqual(set3.toArray(), [1, 2, 3, 4, 5, 6]);
    set3.add([1, 2, 3], {2: 3});
    assert.deepEqual(set3.toArray(), [1, 2, 3, 4, 5, 6, [1, 2, 3], {2: 3}]);
    /**
     * Testing some
     */
    assert.equal(set2.some(
        function (val, index) {
            return val === 7218;
        }
    ), true);
    assert.equal(set2.some(
        function (val, index) {
            return val === 721;
        }
    ), false);
    assert.equal(set2.some(
        function (val, index) {
            return val === [];
        }
    ), false);
    /**
     * Testing union
     */
    var set4 = new JsSet(),
        set5 = new JsSet();
    assert.ok(set4.union(set5).isEmpty());
    set4.add(1, 2, 3);
    assert.deepEqual(set4.union(set5).toArray(), [1, 2, 3]);
    set5.add(1, 2, 3);
    assert.deepEqual(set4.union(set5).toArray(), [1, 2, 3]);
    set5.add(5, 6);
    assert.deepEqual(set4.union(set5).toArray(), [1, 2, 3, 5, 6]);
    /**
     * Testing getSmallerSet
     */
    var set6 = new JsSet(),
        set7 = new JsSet();
    set6.add(1);
    assert.deepEqual(set6.getSmallerSet(set2), set7);
    set7.add(1, 2);
    assert.deepEqual(set6.getSmallerSet(set7), set6);
    /**
     * Testing intersection
     */
    var set8 = new JsSet(),
        set9 = new JsSet();
    set8.add(1, 2, 3, 4, 5);
    set9.add(1, 5, 6, 7, 9);
    assert.deepEqual(set8.intersection(set9).toArray(), [1, 5]);
    var set10 = new JsSet(),
        set11 = new JsSet();
    set10.add([1, 2, 3], [4, 5, 6], [8, 9], [1, 2], [1, 3]);
    set11.add([1, 2], [6, 7, 8], [8, 9]);
    assert.deepEqual(set10.intersection(set11).toArray(), [
        [1, 2],
        [8, 9]
    ]);
    /**
     * Testing difference
     */
    var set12 = new JsSet(),
        set13 = new JsSet();
    set12.add(1, 2, 3);
    set13.add(3, 4, 5);
    assert.deepEqual(set12.difference(set13).toArray(), [1, 2]);
    set12.add(3, 4, 5);
    assert.deepEqual(set12.difference(set13).toArray(), [1, 2]);
    set13.add(1, 2);
    assert.deepEqual(set12.difference(set13).toArray(), []);
    /**
     * Testing subset
     */
    var set14 = new JsSet(),
        set15 = new JsSet();
    set14.add(1, 2, 3, 4, 5, 6);
    set15.add(1, 2, 4);
    assert.ok(set14.subset(set15));
    set15.add(7);
    assert.ok(set14.subset(set15));
});
