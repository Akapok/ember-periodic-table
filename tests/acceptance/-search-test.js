import { module, test } from 'qunit';
import { visit, typeIn, fillIn, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-periodic-table/tests/helpers';

module('Acceptance | -search', function (hooks) {
  setupApplicationTest(hooks);

  function getDimmedElements() {
    return document.querySelectorAll('.dimmed').length;
  }

  function getHighlightedElements() {
    return document.querySelectorAll('.highlighted').length;
  }

  hooks.beforeEach(async function () {
    await visit('/');
  });

  test('[Complete] it highlights 1 element / search by name', async function (assert) {
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
