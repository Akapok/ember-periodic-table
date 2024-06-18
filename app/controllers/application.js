import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class PlayController extends Controller {
  @service router;

  get currentRoute() {
    return this.router.currentRouteName;
  }

  get buttonLabel() {
    return this.currentRoute === 'play' ? 'Periodic Table' : 'Play';
  }

  get routeToTransitionTo() {
    return this.currentRoute === 'play' ? 'index' : 'play';
  }
}
