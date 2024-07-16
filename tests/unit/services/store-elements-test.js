import { module, test } from 'qunit';
import { setupTest } from 'ember-periodic-table/tests/helpers';

module('Unit | Service | store-elements', function (hooks) {
  setupTest(hooks);

  test('it can fetch elements', async function (assert) {
    let service = this.owner.lookup('service:store-elements');
    await service.fetchElements();
    assert.strictEqual(service.elements.length, 119, 'elements are fetched');
  });
});
