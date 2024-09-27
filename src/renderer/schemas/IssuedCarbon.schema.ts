import { IssuedTonsCo2 } from './IssuedTonsCo2.schema';

interface IssuedCarbon<T> {
  issuedTonsCo2: IssuedTonsCo2[];
  context: T;
}

export interface IssuedCarbonByMethodology extends IssuedCarbon<'Methodology'> {}
export interface IssuedCarbonByProjectType extends IssuedCarbon<'ProjectType'> {}
