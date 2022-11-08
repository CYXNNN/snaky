import {Field} from './Field';

export class Consumable {
  location: Field;
  strength: number; // pass any length ur snake should grow if she hits it
  consumed = false;

  constructor(location: Field, strength: number = 1) {
    this.location = location;
    this.strength = strength;
  }

}
