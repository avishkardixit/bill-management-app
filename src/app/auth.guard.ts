import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = () => {
  return requireLogin();
};

export const authChildGuard: CanActivateChildFn = () => {
  return requireLogin();
};

function requireLogin(): boolean {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn) return true;

  router.navigate(['/']);
  return false;
}

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  if (auth.isAdmin) return true;

  router.navigate(['/app/dashboard']);
  return false;
};

export const writeGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  if (auth.canWrite) return true;

  router.navigate(['/app/dashboard']);
  return false;
};
