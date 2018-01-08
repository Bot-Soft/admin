import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
declare let window: any;
declare let FB: any;

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-main-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor() {
    
    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;

        console.log("UID: " + uid);
        console.log("accessToken: " + accessToken);

      } else if (response.status === "not_authorized") {
        // the user is logged in to Facebook,
        // but has not authenticated your app
        window.location.replace("/#/auth");

      } else {
        // the user isn't logged in to Facebook.
        window.location.replace("/#/auth");
      }
    });
  }
}
