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

  test('it renders nothing if no element', async function (assert) {
    await render(hbs`<Element />`);

    assert.dom('[data-test-element]').doesNotExist();
  });
});
