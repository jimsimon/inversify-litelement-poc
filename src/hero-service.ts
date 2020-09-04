import {from, Observable, of} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {Hero} from './hero';
import {MessageService} from './message-service';
import {injectable} from "inversify";

@injectable()
export class HeroService {

    private heroesUrl = '/api/heroes';  // URL to web api

    httpOptions = {
        headers: new Headers({'Content-Type': 'application/json'})
    };

    constructor(
        private messageService: MessageService) {
    }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
        return fromFetch(this.heroesUrl)
            .pipe(
                switchMap(response => {
                    if (response.ok) {
                        // OK return data
                        return response.json();
                    } else {
                        // Server is returning a status requiring the client to try something else.
                        return of({error: true, message: `Error ${response.status}`});
                    }
                }),
                tap(_ => this.log('fetched heroes')),
                catchError(this.handleError<Hero[]>('getHeroes', []))
            );
    }

    /** GET hero by id. Return `undefined` when id not found */
    getHeroNo404<Data>(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/?id=${id}`;
        return fromFetch(url)
            .pipe(
                switchMap(response => {
                    if (response.ok) {
                        // OK return data
                        return response.json();
                    } else {
                        // Server is returning a status requiring the client to try something else.
                        return of({error: true, message: `Error ${response.status}`});
                    }
                }),
                map(heroes => heroes[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} hero id=${id}`);
                }),
                catchError(this.handleError<Hero>(`getHero id=${id}`))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return fromFetch(url).pipe(
            switchMap(response => {
                if (response.ok) {
                    // OK return data
                    return response.json();
                } else {
                    // Server is returning a status requiring the client to try something else.
                    return of({error: true, message: `Error ${response.status}`});
                }
            }),
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return fromFetch(`${this.heroesUrl}/?name=${term}`).pipe(
            switchMap(response => {
                if (response.ok) {
                    // OK return data
                    return response.json();
                } else {
                    // Server is returning a status requiring the client to try something else.
                    return of({error: true, message: `Error ${response.status}`});
                }
            }),
            tap(x => x.length ?
                this.log(`found heroes matching "${term}"`) :
                this.log(`no heroes matching "${term}"`)),
            catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new hero to the server */
    addHero(hero: Hero): Observable<Hero> {
        return fromFetch(this.heroesUrl, {
            ...this.httpOptions,
            body: JSON.stringify(hero),
            method: 'POST'
        }).pipe(
            switchMap(response => {
                if (response.ok) {
                    // OK return data
                    return response.json();
                } else {
                    // Server is returning a status requiring the client to try something else.
                    return of({error: true, message: `Error ${response.status}`});
                }
            }),
            tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    /** DELETE: delete the hero from the server */
    deleteHero(hero: Hero | number): Observable<Hero> {
        const id = typeof hero === 'number' ? hero : hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return fromFetch(url, {
            ...this.httpOptions,
            method: "DELETE"
        }).pipe(
            switchMap(response => {
                if (response.ok) {
                    // OK return data
                    return response.json();
                } else {
                    // Server is returning a status requiring the client to try something else.
                    return of({error: true, message: `Error ${response.status}`});
                }
            }),
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        );
    }

    /** PUT: update the hero on the server */
    updateHero(hero: Hero): Observable<any> {
        return fromFetch(this.heroesUrl, {
            ...this.httpOptions,
            body: JSON.stringify(hero),
            method: "PUT"
        }).pipe(
            switchMap(response => {
                if (response.ok) {
                    // OK return data
                    return response.json();
                } else {
                    // Server is returning a status requiring the client to try something else.
                    return of({error: true, message: `Error ${response.status}`});
                }
            }),
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
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