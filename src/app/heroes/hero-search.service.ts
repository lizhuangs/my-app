import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';
import { GlobalData } from '../providers/GlobalData';
@Injectable()
export class HeroSearchService {
  private search_hero_url = '/api/heroes/?name=';  // URL to web api
  constructor(
    private http: Http,
    globalData: GlobalData) {
    this.search_hero_url = globalData.api_url + this.search_hero_url;
  }

  search(term: string): Observable<Hero[]> {
    return this.http
      .get(this.search_hero_url + `${term}`)
      .map(response => response.json() as Hero[]);
  }
}
