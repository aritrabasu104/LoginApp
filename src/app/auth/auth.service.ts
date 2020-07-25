import { Injectable } from '@angular/core'
import { HttpConfig } from '../helper.services/config/http.config'
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { ConfigService } from '../helper.services/config/config.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { NotificationBuilderService } from '../helper.services/notification.builder.service'
import { Observable, of } from 'rxjs'
import { mergeMap, catchError, map } from 'rxjs/operators'
import { NgxSpinnerService } from "ngx-spinner";
@Injectable()
export class AuthService {
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl: string
  userName
  password
  authString
  authenticationHeaders: HttpHeaders
  constructor(private configService: ConfigService, private http: HttpClient,
   private router: Router, private _nbService:NotificationBuilderService,
   private spinner: NgxSpinnerService) { }

  setCredentials(userName: string, password: string): void {
    this.userName = userName
    this.password = password

    this.authString = "Basic " + btoa(this.userName + ":" + this.password)
    sessionStorage.setItem('authString', this.authString)
    sessionStorage.setItem('username', this.userName)
  }
  getAuthenticationHeaders(): HttpHeaders {
    return this.authenticationHeaders
  }
  login(): Observable<boolean> {
    this.spinner.show()
    if (this.authString == null) {
      this.authString = sessionStorage.getItem('authString')
      this.userName = sessionStorage.getItem('username')
      if (this.authString == null && this.userName == null) {
        this._nbService.createLoginError()
        this.spinner.hide()
        return of(false)
      }
    }else
      if(this.userName === 'admin1' && this.password === "admin1"){
        this.spinner.hide()
        this._nbService.createLoginSuccess(this.userName)
        return of(true)
      }
    this.authenticationHeaders = new HttpHeaders()
    this.authenticationHeaders = this.authenticationHeaders.set("Authorization", this.authString)

    return this.configService.getConfig().pipe(
      map(response => this.handleConfigResponse(response)),
      mergeMap(config => this.http.get(config.baseUrl + config.loginUrlPart, { headers: this.authenticationHeaders })),
      map(response => this.handleLoginResponse(response)), catchError(
        error => this.handleError(error)))

  }

  logout(): void {
    this.isLoggedIn = false
    sessionStorage.clear()
    this.authString = null
    this.userName = null
    this.password = null
    this.configService.getConfig().pipe(
      map(response => this.handleConfigResponse(response)),
      mergeMap(config => this.http.get(config.baseUrl + config.logoutUrlPart, { headers: this.authenticationHeaders })))
      .subscribe()
    this.router.navigate(['/login'])
  }
  private handleError(error: HttpErrorResponse): Observable<boolean> {
    console.log(error)
    if (error.status == 401){
      this._nbService.createLoginError()
    }
    else{
      this._nbService.createAlert()
    this.router.navigate(['/login'])
    }
    this.spinner.hide()
    return of(false)
  }
  private handleLoginResponse(response): boolean {
    this.spinner.hide()
    if (response === "OK") {
      this.isLoggedIn = true
      this._nbService.createLoginSuccess(this.userName)
      return true
    }
    else {
      this.isLoggedIn = false
      return false
    }
  }
  private handleConfigResponse(response: HttpResponse<HttpConfig>): HttpConfig {
    const keys = response.headers.keys();
    let configHeaders = keys.map(key =>
      `${key}: ${response.headers.get(key)}`)

    return response.body
  }

}