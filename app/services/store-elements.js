import Service from '@ember/service';
import Element from 'ember-periodic-table/models/element';
import { tracked } from '@glimmer/tracking';
import config from 'ember-periodic-table/config/environment';

const { rootURL } = config;

export default class StoreElementsService extends Service {
  @tracked elements = undefined;

  async fetchElements() {
    let response = await fetch(`${rootURL}assets/elements.json`);
    let elementsJSON = await response.json();
    this.elements = elementsJSON.elements.map(
      (element) => new Element(element),
    );
  }
}
