import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';

export default class IndexController extends Controller {
  @tracked currentElement = undefined;

  sidebar = undefined;

  @tracked searchInput = undefined;

  @action
  initSidenav() {
    this.sidebar = document.querySelector('.sidenav');
    M.Sidenav.init(this.sidebar);
  }

  @action
  openElementDetails(element) {
    this.currentElement = element;
    let instance = M.Sidenav.getInstance(this.sidebar);
    instance.open();
  }

  @action
  performSearch(e) {
    let { value } = e.target;

    this._clearSearch();

    if (value === '') {
      return;
    }

    let chosenOnes = this.model.filter((element) => {
      return (
        element.name.toLowerCase().includes(value.toLowerCase()) ||
        element.symbol.toLowerCase().includes(value.toLowerCase()) ||
        element.number.toString().includes(value)
      );
    });

    let others = this.model.filter((element) => {
      return !chosenOnes.includes(element);
    });

    chosenOnes.forEach((element) => {
      element.searchState = 'highlighted';
    });

    others.forEach((element) => {
      element.searchState = 'dimmed';
    });
  }

  _clearSearch() {
    this.model.forEach((element) => {
      element.searchState = undefined;
    });
  }
}
