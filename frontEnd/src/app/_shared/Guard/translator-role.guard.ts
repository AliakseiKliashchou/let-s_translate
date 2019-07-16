import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TranslatorRoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    const isTranslator = this.authService.getRole();
    if (isTranslator !== 'translator') this.router.navigate(['/']);
    return (isTranslator === 'translator');
  }
}
