import { module, test } from 'qunit';

import { setupTest } from 'ember-periodic-table/tests/helpers';

module('Unit | Model | element', function (hooks) {
  setupTest(hooks);

  test('it has a correct gridPosition', function (assert) {
    let store = this.owner.lookup('service:store');
    let element = store.createRecord('element', {
      xpos: 1,
      ypos: 1,
    });

    assert.strictEqual(
      element.gridPosition.toString(),
      'grid-row-start: 1; grid-column-start: 1',
    );

    element.xpos = 2;
    element.ypos = 5;

    assert.strictEqual(
      element.gridPosition.toString(),
      'grid-row-start: 5; grid-column-start: 2',
    );
  });

  // Test color property
  test('it has a correct color', function (assert) {
    let store = this.owner.lookup('service:store');
    let element = store.createRecord('element', {
      category: 'diatomic nonmetal',
    });

    assert.strictEqual(element.color, '#3FB8AF');

    element.category = 'noble gas';

    assert.strictEqual(element.color, '#FF3D7F');

    element.category = 'alkali metal';

    assert.strictEqual(element.color, '#FF4E50');

    element.category = 'alkaline earth metal';

    assert.strictEqual(element.color, '#FC913A');

    element.category = 'metalloid';

    assert.strictEqual(element.color, '#F9D423');

    element.category = 'polyatomic nonmetal';

    assert.strictEqual(element.color, '#EDE574');

    element.category = 'post-transition metal';

    assert.strictEqual(element.color, '#E1F5C4');

    element.category = 'unknown';

    assert.strictEqual(element.color, '#FF9E9D');

    element.category = 'my-category';

    assert.strictEqual(element.color, '#DAD8A7');
  });
});
