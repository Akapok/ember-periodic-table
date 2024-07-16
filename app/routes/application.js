import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service storeElements;

  async model() {
    await this.storeElements.fetchElements();
  }
}
