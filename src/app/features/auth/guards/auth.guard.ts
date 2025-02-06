import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from '../services/auth.service';

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();

    if (!token) {
        // router.navigate(['/auth/login']);
        return false;
    }

    // if (!this.authService.isTokenValid()) {
    //     this.authService.logout();
    //     this.router.navigate(['/auth/login']);
    //     return false;
    //   }

    return true;
}

