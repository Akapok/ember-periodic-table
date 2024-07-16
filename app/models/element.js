import { htmlSafe } from '@ember/template';

export default class Element {
  id;
  name;
  appearance;
  atomicMass;
  boil;
  category;
  density;
  discoveredBy;
  melt;
  molarHeat;
  namedBy;
  number;
  period;
  group;
  phase;
  source;
  bohrModelImage;
  bohrModel3d;
  spectralImg;
  summary;
  symbol;
  xpos;
  ypos;
  wxpos;
  wypos;
  shells;
  electronConfiguration;
  electronConfigurationSemantic;
  electronAffinity;
  electronegativityPauling;
  ionizationEnergies;
  cpkHex;
  image;
  block;

  searchState;

  constructor(element) {
    Object.assign(this, element);
    this.id = element.number;
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
