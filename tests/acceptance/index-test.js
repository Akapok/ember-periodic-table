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
      .dom('[data-test-element-id="1"] [data-test-element-number]')
      .hasText('1', 'element number is rendered');
    assert
      .dom('[data-test-element-id="1"] [data-test-element-symbol]')
      .hasText('H', 'element symbol is rendered');
    assert
      .dom('[data-test-element-id="1"] [data-test-element-name]')
      .hasText('Hydrogen', 'element name is rendered');

    // Test another element
    assert
      .dom('[data-test-element-id="107"] [data-test-element-number]')
      .hasText('107', 'element number is rendered');
    assert
      .dom('[data-test-element-id="107"] [data-test-element-symbol]')
      .hasText('Bh', 'element symbol is rendered');
    assert
      .dom('[data-test-element-id="107"] [data-test-element-name]')
      .hasText('Bohrium', 'element name is rendered');
  });

  test('it displays element details', async function (assert) {
    await visit('/');

    // Click on the first element
    await click('[data-test-element-id="1"] [data-test-element]');

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
      .dom('.element-details [data-test-element-number]')
      .hasText('1', 'element number is rendered');

    assert
      .dom('.element-details [data-test-element-atomic-mass]')
      .hasText('1.008', 'element atomic mass is rendered');

    assert
      .dom('.element-details [data-test-element-category]')
      .hasText('diatomic nonmetal', 'element category is rendered');

    assert
      .dom('.element-details [data-test-element-phase]')
      .hasText('Gas', 'element phase is rendered');

    assert
      .dom('.element-details [data-test-element-boiling-point]')
      .hasText('20.271 K', 'element boiling point is rendered');

    assert
      .dom('.element-details [data-test-element-melting-point]')
      .hasText('13.99 K', 'element melt is rendered');

    assert
      .dom('.element-details [data-test-element-density]')
      .hasText('0.08988 kg/m^3', 'element density is rendered');

    assert
      .dom('.element-details [data-test-element-discovered-by]')
      .hasText('Henry Cavendish', 'element discovered by is rendered');

    assert
      .dom('.element-details [data-test-element-named-by]')
      .hasText('Antoine Lavoisier', 'element named by is rendered');

    // Switch element
    await click('[data-test-element-id="107"] [data-test-element]');

    assert
      .dom('.element-details [data-test-element-symbol]')
      .hasText('Bh', 'element symbol is rendered');

    assert
      .dom('.element-details [data-test-element-name]')
      .hasText('Bohrium', 'element name is rendered');

    assert
      .dom('.element-details [data-test-element-number]')
      .hasText('107', 'element number is rendered');

    assert
      .dom('.element-details [data-test-element-atomic-mass]')
      .hasText('270', 'element atomic mass is rendered');

    assert
      .dom('.element-details [data-test-element-category]')
      .hasText('transition metal', 'element category is rendered');

    assert
      .dom('.element-details [data-test-element-phase]')
      .hasText('Solid', 'element phase is rendered');

    assert
      .dom('.element-details [data-test-element-boiling-point]')
      .doesNotExist('element boiling point is not rendered');

    assert
      .dom('.element-details [data-test-element-melt]')
      .doesNotExist('element melt is not rendered');

    assert
      .dom('.element-details [data-test-element-density]')
      .hasText('37.1 kg/m^3', 'element density is rendered');

    assert
      .dom('.element-details [data-test-element-discovered-by]')
      .hasText(
        'Gesellschaft für Schwerionenforschung',
        'element discovered by is rendered',
      );

    assert
      .dom('.element-details [data-test-element-named-by]')
      .doesNotExist('element named by is not rendered');
  });
});
