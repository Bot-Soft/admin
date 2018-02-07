import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
declare let window: any;
declare let FB: any;

@Component({
  selector: "ngx-categories",
  styleUrls: ["./categories.component.scss"],
  templateUrl: "./categories.component.html"
})
export class CategoriesComponent {
  categories;
  constructor(private http: Http, private route: ActivatedRoute) {
    let that = this;
    let botId = this.route.parent.snapshot.params.id;

    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;

        that.http
          .get(
            "https://3klcm8k5x0.execute-api.eu-central-1.amazonaws.com/latest/bots/" +
              botId +
              "/categories?access_token=" +
              accessToken
          )
          .map(response => response.json())
          .subscribe(res => {
            let _categories = res;

            that.categories = _categories.sort((a, b) => {
              return a.order - b.order;
            });
          });
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
