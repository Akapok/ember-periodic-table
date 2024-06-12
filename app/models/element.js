import Model, { attr } from '@ember-data/model';
import { htmlSafe } from '@ember/template';

export default class ElementModel extends Model {
  // generate attr for each element property
  @attr name;
  @attr appearance;
  @attr atomicMass;
  @attr boil;
  @attr category;
  @attr density;
  @attr discoveredBy;
  @attr melt;
  @attr molarHeat;
  @attr namedBy;
  @attr number;
  @attr period;
  @attr group;
  @attr phase;
  @attr source;
  @attr bohrModelImage;
  @attr bohrModel3d;
  @attr spectralImg;
  @attr summary;
  @attr symbol;
  @attr xpos;
  @attr ypos;
  @attr wxpos;
  @attr wypos;
  @attr shells;
  @attr electronConfiguration;
  @attr electronConfigurationSemantic;
  @attr electronAffinity;
  @attr electronegativityPauling;
  @attr ionizationEnergies;
  @attr cpkHex;
  @attr image;
  @attr block;

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
