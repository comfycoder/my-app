import { Injectable } from '@angular/core';

/** Mock client-side authentication/authorization service */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAuthorizationToken() {
    return 'some-auth-token';
  }
}
