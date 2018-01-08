import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

declare let window: any;
declare let FB: any;

@Component({
  selector: "ngx-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
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
        window.location.replace("/#/pages");

      } else if (response.status === "not_authorized") {
        // the user is logged in to Facebook,
        // but has not authenticated your app

      } else {
        // the user isn't logged in to Facebook.

      }
    });

    FB.Event.subscribe("auth.statusChange", response => {
      if (response.status === "connected") {
        if (response.authResponse) {
          window.location.replace("/#/pages");
          FB.api("/me", function (response) {

          });
        } else {

        }
      }
    });
  }

  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }
}
