import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getUserState().pipe(
      take(1),
      map((user) => !!user), // <-- map to boolean
      tap((loggedIn) => {
        if (!loggedIn) {
          this.snackBar.open(
            'You need be Logged in to access this feature',
            'Dismiss',
            {
              duration: 5000,
            }
          );
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
