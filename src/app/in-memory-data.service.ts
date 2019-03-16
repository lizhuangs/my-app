import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Hero} from './heroes/hero';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {id: 11, name: 'Mr. Nice', alterEgo: '', power: ''},
      {id: 12, name: 'Narco', alterEgo: '', power: ''},
      {id: 13, name: 'Bombasto', alterEgo: '', power: ''},
      {id: 14, name: 'Celeritas', alterEgo: '', power: ''},
      {id: 15, name: 'Magneta', alterEgo: '', power: ''},
      {id: 16, name: 'RubberMan', alterEgo: '', power: ''},
      {id: 17, name: 'Dynama', alterEgo: '', power: ''},
      {id: 18, name: 'Dr IQ', alterEgo: '', power: ''},
      {id: 19, name: 'Magma', alterEgo: '', power: ''},
      {id: 20, name: 'Tornado', alterEgo: '', power: ''}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

}
