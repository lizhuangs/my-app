import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  // 使用内存数据库的时候需要将所有response.json()改成response.json().data
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', alterEgo: '', power: '' },
      { id: 12, name: 'Narco', alterEgo: '', power: '' },
      { id: 13, name: 'Bombasto', alterEgo: '', power: '' },
      { id: 14, name: 'Celeritas', alterEgo: '', power: '' },
      { id: 15, name: 'Magneta', alterEgo: '', power: '' },
      { id: 16, name: 'RubberMan', alterEgo: '', power: '' },
      { id: 17, name: 'Dynama', alterEgo: '', power: '' },
      { id: 18, name: 'Dr IQ', alterEgo: '', power: '' },
      { id: 19, name: 'Magma', alterEgo: '', power: '' },
      { id: 20, name: 'Tornado', alterEgo: '', power: '' }
    ];
    return { heroes };
  }
}
