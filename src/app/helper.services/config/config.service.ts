import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {HttpConfig} from './http.config'
import { HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import { catchError } from 'rxjs/operators'

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

    httpConfigUrl = 'assets/http.config.json';
    getConfig() :Observable<HttpResponse<HttpConfig>>{
        return this.http.get<HttpConfig>(this.httpConfigUrl,{ observe: 'response' }).pipe(
            catchError(this.handleError))
    }
    private handleError(error: HttpErrorResponse) {
        let errorMsg
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMsg = error.error.message
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMsg = `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`
        }
        // return an ErrorObservable with a user-facing error message
        return throwError(errorMsg)
      }
}
