import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';

const difficultyOptions = [
  {
    value: 'easy',
    label: 'Easy',
    description: "You'll have everything: the name, the color and the symbol",
  },
  {
    value: 'medium',
    label: 'Medium',
    description: "You'll just have the name and the color",
  },
  {
    value: 'hard',
    label: 'Hard',
    description: "You'll just have the name",
  },
];

export default class PlayController extends Controller {
  @tracked shuffledElements = A();
  @tracked difficulty = 'easy';

  difficultyOptions = difficultyOptions;

  startModalInstance = undefined;
  finishModalInstance = undefined;

  get gameCompleted() {
    return this.currentElementsOrder.every(
      (val, index) => val === this.modelOrder[index],
    );
  }

  get currentElementsOrder() {
    return this.shuffledElements.map((element) => element.id);
  }

  get modelOrder() {
    return this.model.map((element) => element.id);
  }

  @action
  shuffleElements() {
    this.shuffledElements = this.model
      .map((element) => ({ element, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ element }) => {
        if (this.difficulty === 'hard') {
          return {
            id: element.id,
            symbol: element.symbol,
          };
        } else if (this.difficulty === 'medium') {
          return {
            id: element.id,
            name: element.name,
            color: element.color,
          };
        } else {
          return element;
        }
      });

    this.shuffledElements = A(this.shuffledElements);
  }

  @action
  getElementPosition(index) {
    return this.model[index].gridPosition;
  }

  @action
  initScreens() {
    let startModalodal = document.querySelector('.startModal');
    this.startModalInstance = M.Modal.init(startModalodal);

    let finishModal = document.querySelector('.finishModal');
    this.finishModalInstance = M.Modal.init(finishModal);

    this.displayStartScreen();
  }

  @action
  launchGame() {
    this.shuffleElements();
  }

  @action
  displayStartScreen() {
    this.startModalInstance.open();
  }

  @action
  checkedGameState() {
    if (this.gameCompleted) {
      this.startModalInstance.close();
      this.finishModalInstance.open();
    }
  }
}
