import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// Function not Class
export const authGuard: CanActivateFn = (route, state) => { 


  let _Router = inject(Router)
  if (localStorage.getItem('eToken') != null) { // User loged In
    return true;
    
  }
  else{

    _Router.navigate(['/login']);
    return false;
  }


  
};
