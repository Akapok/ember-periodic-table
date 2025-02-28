import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-periodic-table/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | element', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders element', async function (assert) {
    this.set('elem', {
      name: 'Hydrogen',
      number: 1,
      symbol: 'H',
    });

    await render(hbs`<Element @element={{this.elem}} />`);

    assert
      .dom('[data-test-element-number]')
      .hasText('1', 'element number is rendered');
    assert
      .dom('[data-test-element-symbol]')
      .hasText('H', 'element symbol is rendered');
    assert
      .dom('[data-test-element-name]')
      .hasText('Hydrogen', 'element name is rendered');
  });

  test('it returns background color', async function (assert) {
    this.set('elem', {
      color: '#FF3D7F',
    });

    await render(hbs`<Element @element={{this.elem}} />`);

    assert
      .dom('[data-test-element]')
      .hasAttribute('style', 'background-color: #FF3D7F');
  });

  // test if background color is not set
  test('it returns default background color', async function (assert) {
    this.set('elem', {
      name: 'Hydrogen',
      number: 1,
      symbol: 'H',
    });

    await render(hbs`<Element @element={{this.elem}}/>`);

    assert
      .dom('[data-test-element]')
      .hasAttribute('style', 'background-color: lightgrey');
  });

  test.each(
    'it can render some element property',
    [
      {
        elem: {
          number: 1,
          symbol: 'H',
          name: 'Hydrogen',
        },
        expected: ['number', 'symbol', 'name'],
        unexpected: [],
      },
      {
        elem: {
          name: 'Hydrogen',
        },
        expected: ['name'],
        unexpected: ['number', 'symbol'],
      },
      {
        elem: {
          number: 1,
          symbol: 'H',
        },
        expected: ['number', 'symbol'],
        unexpected: ['name'],
      },
    ],
    async function (assert, { elem, expected, unexpected }) {
      this.set('elem', elem);

      await render(hbs`<Element @element={{this.elem}} />`);

      expected.forEach((prop) => {
        assert.dom(`[data-test-element-${prop}]`).exists();
      });

      unexpected.forEach((prop) => {
        assert.dom(`[data-test-element-${prop}]`).doesNotExist();
      });
    },
  );

  test('it renders nothing if no element', async function (assert) {
    await render(hbs`<Element />`);

    assert.dom('[data-test-element]').doesNotExist();
  });
});
