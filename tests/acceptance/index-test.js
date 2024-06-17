import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-periodic-table/tests/helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting main page', async function (assert) {
    await visit('/');

    assert
      .dom('.element-container')
      .exists({ count: 119 }, 'all the elements are rendered');
  });

  test('it displays elements information', async function (assert) {
    await visit('/');

    // Test first element
    assert
      .dom('.element-container:first-child [data-test-element-number]')
      .hasText('1', 'element number is rendered');
    assert
      .dom('.element-container:first-child [data-test-element-symbol]')
      .hasText('H', 'element symbol is rendered');
    assert
      .dom('.element-container:first-child [data-test-element-name]')
      .hasText('Hydrogen', 'element name is rendered');

    // Test another element
    assert
      .dom('.element-container:nth-child(107) [data-test-element-number]')
      .hasText('107', 'element number is rendered');
    assert
      .dom('.element-container:nth-child(107) [data-test-element-symbol]')
      .hasText('Bh', 'element symbol is rendered');
    assert
      .dom('.element-container:nth-child(107) [data-test-element-name]')
      .hasText('Bohrium', 'element name is rendered');
  });

  test('it displays element details', async function (assert) {
    await visit('/');

    // Click on the first element
    await click('.element-container:first-child [data-test-element]');

    assert
      .dom('[data-test-element-details]')
      .exists('decorative element is rendered');

    assert
      .dom('.element-details [data-test-element-symbol]')
      .hasText('H', 'element symbol is rendered');
    assert
      .dom('.element-details [data-test-element-name]')
      .hasText('Hydrogen', 'element name is rendered');
    assert
      .dom('.element-details [data-test-element-atomic-mass]')
      .hasText('1.008', 'element atomic mass is rendered');
    assert
      .dom('.element-details [data-test-element-summary]')
      .exists('element summary is rendered');

    // Switch element
    await click('.element-container:nth-child(107) [data-test-element]');

    assert
      .dom('.element-details [data-test-element-symbol]')
      .hasText('Bh', 'element symbol is rendered');

    assert
      .dom('.element-details [data-test-element-name]')
      .hasText('Bohrium', 'element name is rendered');

    assert
      .dom('.element-details [data-test-element-atomic-mass]')
      .hasText('270', 'element atomic mass is rendered');

    assert
      .dom('.element-details [data-test-element-summary]')
      .exists('element summary is rendered');
  });
});
