import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class ElementComponent extends Component {
  get backgroundColor() {
    if (this.args.element.color) {
      return htmlSafe(`background-color: ${this.args.element.color}`);
    }

    return 'background-color: lightgrey';
  }
}
