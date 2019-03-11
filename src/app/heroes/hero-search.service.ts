import {HttpClient} from '@angular/common/http';
import {Hero} from './hero';
import {GlobalData} from '../providers/GlobalData';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroSearchService {
  private search_hero_url = '/api/heroes/?name=';  // URL to web api
  constructor(
    private http: HttpClient, globalData: GlobalData, private messageService: MessageService) {
    this.search_hero_url = globalData.api_url + this.search_hero_url;
  }

  search(term: string): Observable<{} | Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.search_hero_url}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
    /*return this.http
      .get(this.search_hero_url + `${term}`)
      .map(response => response.json() );*/
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
