import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-periodic-table/tests/helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting main page', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-element]')
      .exists({ count: 119 }, 'all the elements are rendered');
  });

  test('it displays elements information', async function (assert) {
    await visit('/');

    // Test first element
    assert
      .dom('[data-test-element]:first-child [data-test-element-number]')
      .hasText('1', 'element number is rendered');
    assert
      .dom('[data-test-element]:first-child [data-test-element-symbol]')
      .hasText('H', 'element symbol is rendered');
    assert
      .dom('[data-test-element]:first-child [data-test-element-name]')
      .hasText('Hydrogen', 'element name is rendered');

    // Test another element
    assert
      .dom('[data-test-element]:nth-child(107) [data-test-element-number]')
      .hasText('107', 'element number is rendered');
    assert
      .dom('[data-test-element]:nth-child(107) [data-test-element-symbol]')
      .hasText('Bh', 'element symbol is rendered');
    assert
      .dom('[data-test-element]:nth-child(107) [data-test-element-name]')
      .hasText('Bohrium', 'element name is rendered');
  });
});
