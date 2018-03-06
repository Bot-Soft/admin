import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, Router } from '@angular/router';

declare let window: any;
declare let FB: any;

@Component({
  selector: "ngx-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {

    let that = this;

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;
        debugger;
        window.location.replace("/#/pages");

      } else if (response.status === "not_authorized") {
        // the user is logged in to Facebook,
        // but has not authenticated your app

        debugger;

      } else {
        // the user isn't logged in to Facebook.
        debugger;
      }
    });

    FB.Event.subscribe("auth.statusChange", response => {
      if (response.status === "connected") {
        if (response.authResponse) {
          // window.location.replace("/#/pages");
          debugger;
          that.router.navigate(['/pages']);
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
