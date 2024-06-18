import { module, test } from 'qunit';
import {
  visit,
  click,
  typeIn,
  fillIn,
  triggerEvent,
} from '@ember/test-helpers';
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

  // new module
  module('search feature', function () {
    function getDimmedElements() {
      return document.querySelectorAll('.dimmed').length;
    }

    function getHighlightedElements() {
      return document.querySelectorAll('.highlighted').length;
    }

    test('[Complete] it highlights 1 element / search by name', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', 'Hydrogen');

      assert
        .dom('[data-test-element-id="1"]')
        .hasClass('highlighted', 'element Hydrogen is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );

      await fillIn('.searchbar', ''); // Clear the input search
      await typeIn('.searchbar', 'Bohrium');

      assert
        .dom('[data-test-element-id="107"]')
        .hasClass('highlighted', 'element Bohrium is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );

      // Clear search
      await fillIn('.searchbar', '');
      await triggerEvent('.searchbar', 'keyup'); // mock key up event

      assert.strictEqual(
        getHighlightedElements(),
        0,
        'no element is highlighted',
      );

      assert.strictEqual(getDimmedElements(), 0, 'no element is dimmed');
    });

    test('[Partial] it highlights several elements  / search by name', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', 'Al');

      assert.strictEqual(
        getHighlightedElements(),
        8,
        '8 elements are highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        111,
        'the other elements are dimmed',
      );

      await fillIn('.searchbar', ''); // Clear the input search
      await typeIn('.searchbar', 'io');

      assert.strictEqual(
        getHighlightedElements(),
        2,
        '2 elements are highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        117,
        'the other elements are dimmed',
      );
    });

    test('[Complete] it highlights correct element with uppercase and lowercase search  / search by name', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', 'HYDROGEN');

      assert
        .dom('[data-test-element-id="1"]')
        .hasClass('highlighted', 'element Hydrogen is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );

      await fillIn('.searchbar', ''); // Clear the input search
      await typeIn('.searchbar', 'hydro');

      assert
        .dom('[data-test-element-id="1"]')
        .hasClass('highlighted', 'element Hydrogen is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );

      await fillIn('.searchbar', ''); // Clear the input search
      await typeIn('.searchbar', 'HyDRoGeN');

      assert
        .dom('[data-test-element-id="1"]')
        .hasClass('highlighted', 'element Hydrogen is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );
    });

    test('[Complete] it highlights 1 element / search by symbol', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', 'CS');

      assert
        .dom('[data-test-element-id="55"]')
        .hasClass('highlighted', 'element Cesium is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );

      await fillIn('.searchbar', ''); // Clear the input search
      await typeIn('.searchbar', 'Bh');

      assert
        .dom('[data-test-element-id="107"]')
        .hasClass('highlighted', 'element Bohrium is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );
    });

    test('[Partial] it highlights several elements  / search by symbol', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', 'Ag');

      assert.strictEqual(
        getHighlightedElements(),
        2,
        '2 elements are highlighted', // Should highlight Silver (Symbol) and Magnesium (Name)
      );

      assert.strictEqual(
        getDimmedElements(),
        117,
        'the other elements are dimmed',
      );
    });

    test('[Complete] it highlights 1 element / search by number', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', '47');

      assert
        .dom('[data-test-element-id="47"]')
        .hasClass('highlighted', 'element Silver is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );

      await fillIn('.searchbar', ''); // Clear the input search
      await typeIn('.searchbar', '107');

      assert
        .dom('[data-test-element-id="107"]')
        .hasClass('highlighted', 'element Bohrium is highlighted');

      assert.strictEqual(
        getHighlightedElements(),
        1,
        'only 1 element is highlighted',
      );

      assert.strictEqual(
        getDimmedElements(),
        118,
        'the other elements are dimmed',
      );
    });

    test('[Partial] it highlights several elements  / search by number', async function (assert) {
      await visit('/');

      await typeIn('.searchbar', '10');

      assert.strictEqual(
        getHighlightedElements(),
        12,
        '12 elements are highlighted', // Should be 10, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110
      );

      assert.strictEqual(
        getDimmedElements(),
        107,
        'the other elements are dimmed',
      );
    });
  });
});
