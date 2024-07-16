import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click } from '@ember/test-helpers';

module('Acceptance | Play', function (hooks) {
  setupApplicationTest(hooks);

  test('start modal is opened', async function (assert) {
    await visit('/play');

    assert.dom('.startModal').hasClass('open', 'start modal is opened');

    assert
      .dom('input[type="radio"]')
      .exists({ count: 3 }, '3 difficulty choices are rendered');

    assert
      .dom('input[value="easy"]')
      .isChecked('easy is the default difficulty');
  });

  test.each(
    'we can change difficulty',
    ['easy', 'medium', 'hard'],
    async function (assert, difficulty) {
      await visit('/play');

      await click(`input[value="${difficulty}"]`);

      assert
        .dom(`input[value="${difficulty}"]`)
        .isChecked(`${difficulty} is checked`);

      assert
        .dom('input:checked')
        .exists({ count: 1 }, 'there is only 1 difficulty selected');
    },
  );

  test.each(
    'we can play in different difficulty',
    [
      {
        difficulty: 'easy',
        expectedElementsAttr: [
          'data-test-element-number',
          'data-test-element-symbol',
          'data-test-element-name',
        ],
        unexpectedElementsAttr: [],
        withColor: true,
      },
      {
        difficulty: 'medium',
        expectedElementsAttr: ['data-test-element-name'],
        unexpectedElementsAttr: [
          'data-test-element-symbol',
          'data-test-element-number',
        ],
        withColor: true,
      },
      {
        difficulty: 'hard',
        expectedElementsAttr: ['data-test-element-symbol'],
        unexpectedElementsAttr: [
          'data-test-element-name',
          'data-test-element-number',
        ],
        withColor: false,
      },
    ],
    async function (
      assert,
      { difficulty, expectedElementsAttr, unexpectedElementsAttr, withColor },
    ) {
      await visit('/play');

      // Select the difficulty level
      await click(`input[value="${difficulty}"]`);

      // Start the game
      await click('[data-test-start-game]');
      assert
        .dom('.startModal')
        .doesNotHaveClass('open', 'start modal is closed');

      assert.dom('.rules').exists('rules are rendered');

      assert
        .dom('.element-container')
        .exists({ count: 119 }, 'all the elements are rendered');

      // Test first element
      expectedElementsAttr.forEach((attr) => {
        assert.dom(`[data-test-element-id="1"] [${attr}]`).exists();
      });

      unexpectedElementsAttr.forEach((attr) => {
        assert.dom(`[data-test-element-id="1"] [${attr}]`).doesNotExist();
      });

      if (!withColor) {
        assert
          .dom(`[data-test-element-id="1"]`)
          .hasStyle({ backgroundColor: 'rgb(211, 211, 211)' }); //lightgrey color
      }
    },
  );
});
