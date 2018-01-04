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
    // This function initializes the FB variable
    (function(d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = () => {
      

      FB.init({
        appId: "498860363814397",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v2.11",
      });
      FB.AppEvents.logPageView();

      FB.getLoginStatus(function(response) {
        if (response.status === "connected") {
          // the user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire
          let uid = response.authResponse.userID;
          let accessToken = response.authResponse.accessToken;
        
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
          
            FB.api("/me", function(response) {
              
            });
          } else {
           
          }
        }
      });
    };
  }

  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }
}
