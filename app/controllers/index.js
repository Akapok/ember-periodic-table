import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';

export default class IndexController extends Controller {
  @tracked currentElement = undefined;

  sidebar = undefined;

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
}
