import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const isAdmin = this.authService.getRole();
    if (isAdmin !== 'admin') this.router.navigate(['/']);
    return (isAdmin === 'admin');
  }
}
