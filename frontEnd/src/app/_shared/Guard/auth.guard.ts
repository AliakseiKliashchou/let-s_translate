import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const isAuth = this.authService.getIsAuth();
    const role = this.authService.getRole();
    if (!isAuth || role === 'admin') this.router.navigate(['/']);
    return this.authService.getIsAuth();
  }
}
