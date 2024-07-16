import Route from '@ember/routing/route';
import Element from 'ember-periodic-table/models/element';

export default class IndexRoute extends Route {
  async model() {
    let response = await fetch('assets/elements.json');
    let elementsJSON = await response.json();
    let elements = elementsJSON.elements;
    elements = elements.map((element) => new Element(element));
    return elements;
  }
}
