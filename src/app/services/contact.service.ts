import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Contact } from "../models/contact";
import {
  HttpErrorHandler,
  HandleError
} from "../services/http-error-handler.service";
import { Config } from "../models/config";
import { ConfigService } from "./config.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({
  providedIn: "root"
})
export class ContactService {
  config: Config;
  contactsUrl = ""; // URL to web api
  private handleError: HandleError;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError("ContactService");
    this.configService
      .getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body };
        this.contactsUrl = this.config.contactsUrl;
      });
  }

  /** GET contacts from the server */
  getContacts(): Observable<Contact[]> {
    return this.httpClient
      .get<Contact[]>(this.contactsUrl)
      .pipe(catchError(this.handleError("getContacts", [])));
  }
}
