import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click, currentURL } from '@ember/test-helpers';

module('Acceptance | Application', function (hooks) {
  setupApplicationTest(hooks);

  test('button to navigate works', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link-route]')
      .hasText('Play', 'Play link is rendered');

    await click('[data-test-link-route]');

    assert.strictEqual(currentURL(), '/play', 'we are redirect to play route');
    assert
      .dom('[data-test-link-route]')
      .hasText('Periodic Table', 'Periodic table link is rendered');

    await click('[data-test-link-route]');

    assert.strictEqual(currentURL(), '/', 'we are redirect to index route');
    assert
      .dom('[data-test-link-route]')
      .hasText('Play', 'Play link is rendered');
  });
});
