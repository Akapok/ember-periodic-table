import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PlayRoute extends Route {
  @service storeElements;

  model() {
    return this.storeElements.elements;
  }
}
