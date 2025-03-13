import { CanActivateFn, Router } from '@angular/router';
import { Constant } from '../constant/constant';
import { inject } from '@angular/core';
import { User } from '../models/User';

export const authGuard: CanActivateFn = (route, state) => {
  let loggedInUser: User | null = null;

  const router = inject(Router);
  const user = localStorage.getItem(Constant.LOGGED_IN_USER_KEY);
  debugger;
  if (user != null) {
    try {
      loggedInUser = JSON.parse(user);
    } catch (e) {
      console.log(e);
    }
  }

  if (loggedInUser != null) {
    debugger;
    if (route.data['roles'].includes(loggedInUser.role?.name)) {
      return true;
    } else {
      window.alert('you are not authorized');
      console.log(route);

      return false;
    }
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
