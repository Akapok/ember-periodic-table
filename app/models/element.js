import { htmlSafe } from '@ember/template';
import { tracked } from '@glimmer/tracking';

export default class Element {
  @tracked id;
  @tracked searchState;

  constructor(element) {
    this.id = element.number;
    Object.assign(this, element);
  }

  get gridPosition() {
    return htmlSafe(
      `grid-row-start: ${this.ypos}; grid-column-start: ${this.xpos}`,
    );
  }

  get color() {
    switch (this.category) {
      case 'diatomic nonmetal':
        return '#3FB8AF';
      case 'noble gas':
        return '#FF3D7F';
      case 'alkali metal':
        return '#FF4E50';
      case 'alkaline earth metal':
        return '#FC913A';
      case 'metalloid':
        return '#F9D423';
      case 'polyatomic nonmetal':
        return '#EDE574';
      case 'post-transition metal':
        return '#E1F5C4';
      case 'transition metal':
        return '#B3DDF2';
      case 'lanthanide':
        return '#6689A1';
      case 'actinide':
        return '#FFBE40';
      case 'unknown':
        return '#FF9E9D';
      default:
        return '#DAD8A7';
    }
  }
}
