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
});
