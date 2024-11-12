import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router= inject(Router)
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const localData = localStorage.getItem('angularToken');
    if (localData != null) {
      return true;
    } else {
      router.navigateByUrl("/login");
      return false;
    }
  } else {
    // Se não está no navegador, impede a navegação
    router.navigateByUrl("/login");
    return false;
  }
};
