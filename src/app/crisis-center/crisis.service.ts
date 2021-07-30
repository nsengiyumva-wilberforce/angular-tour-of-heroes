import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Crisis } from './crisis';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private crisesUrl = 'api/crises';

  constructor( private http: HttpClient, private messageService: MessageService) { }
  getCrises(): Observable<Crisis[]>{
   return this.http.get<Crisis[]>(this.crisesUrl)
   .pipe(
     tap(_ => this.log('fetched crises')),
     catchError(this.handleError<Crisis[]>('getCrises', []))
   );
  }
  getCrisis(id: number): Observable<Crisis>{
    const url = `${this.crisesUrl}/${id}`;
    return this.http.get<Crisis>(url)
    .pipe(
      tap(_ => this.log(`fetched crisis id = ${id}`)),
      catchError(this.handleError<Crisis>(`getCrisis id = ${id}`))
    );
  }
  updateCrisis(crisis: Crisis): Observable<any>{
    return this.http.put(this.crisesUrl, crisis, this.httpOptions)
    .pipe(
      tap(_ => this.log(`update crisis id ${crisis.id}`)),
      catchError(this.handleError<any>('UpdateCrisis'))
    );
  }
addCrisis(crisis: Crisis): Observable<Crisis>{
  return this.http.post<Crisis>(this.crisesUrl, crisis, this.httpOptions)
  .pipe(
    tap((newCrisis: Crisis) => this.log(`added crisis w/ id=${newCrisis.id}`)),
    catchError(this.handleError('addCrisis'))
  );
}
deleteCrisis(id: number): Observable<Crisis>{
  const url = `${this.crisesUrl}/${id}`;
  return this.http.delete<Crisis>(url, this.httpOptions)
  .pipe(
    tap(_ => this.log(`deleted crisis id = ${id}`)),
    catchError(this.handleError<Crisis>('dleteCrisis'))
  );
}
searchCrises(term: string): Observable<Crisis[]>{
  if (!term.trim()){
    return of([]);
  }
  return this.http.get<Crisis[]>(`${this.crisesUrl}/?name=${term}`)
  .pipe(
    tap(x => x.length ?
      this.log(`found crises matching "${term}"`) :
       this.log(`no crises matching "${term}"`)),
    catchError(this.handleError<Crisis[]>('searchCrises', []))
    );
}
  private log(message: string): void{
    this.messageService.add(`CrisisService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T): any{
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
