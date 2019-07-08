import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, HttpHeaders
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './service/users/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'access-token': token
      })
    };
    req = req.clone(httpOptions);

    return next.handle(req);
  }
}
