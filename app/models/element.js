import Model, { attr } from '@ember-data/model';

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
}
