import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalData } from '../providers/GlobalData';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from '../common/message/message.service';
import { HttpService } from '../providers/HttpService';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HeroService {
  private heroesUrl = '/api/heroes';  // URL to web api
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient, globalData: GlobalData,
    private httpService: HttpService,
    private messageService: MessageService) {
    this.heroesUrl = globalData.api_url + this.heroesUrl;
  }

  getHeroesOld(): Promise<Hero[]> {
    // toPromise操作符把Observable直接转换成Promise对象
    /*return this.http.get(this.heroesUrl).toPromise()
      .then(response => response.json() as Hero[])
      .catch(this.handleError);*/
    // return this.http.get(this.heroesUrl).toPromise() as Promise<Hero[]>;
    return this.httpService.request(
      {
        url: this.heroesUrl
      }
    ).toPromise() as Promise<Hero[]>;
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleErrorNew<Hero[]>('getHeroes', []))
      );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getHeroNew(id: number | string): Observable<{} | Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleErrorNew<Hero>(`getHero id=${id}`))
    );
  }

  getHero(id: number | string) {
    return this.getHeroes().pipe(
      // (+) before `id` turns the string into a number
      map((heroes: Hero[]) => heroes.find(hero => hero.id === +id))
    );
  }

  getHeroOld(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url).toPromise()
      .then()
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getHeroes2(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroesOld()), 2000);
    });
  }

  getHero2(id: number): Promise<Hero> {
    return this.getHeroesOld().then(heroes => heroes.find(hero => hero.id === id));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleErrorNew<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
