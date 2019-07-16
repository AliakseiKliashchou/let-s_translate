import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerRoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const isCustomer = this.authService.getRole();
    if (isCustomer !== 'customer') this.router.navigate(['/']);
    return (isCustomer === 'customer');
  }
}
