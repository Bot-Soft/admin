import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
declare let window: any;
declare let FB: any;

@Component({
  selector: 'ngx-categories',
  styleUrls: ['./items.component.scss'],
  templateUrl: './items.component.html',
})
export class ItemsComponent {
  items;
  constructor(private http: Http, private route: ActivatedRoute) {
    let that = this;
    let botId = this.route.parent.snapshot.params.id;
    let categoryId = this.route.parent.snapshot.queryParams.category_id;

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;

        let url = "https://3klcm8k5x0.execute-api.eu-central-1.amazonaws.com/latest/bots/" +
          botId +
          "/items?access_token=" +
          accessToken;

        if (categoryId) {
          url += "&category_id=" + categoryId;
        }
        that.http
          .get(
          url
          )
          .map(response => response.json())
          .subscribe(res => {
            let _items = res;

            that.items = _items.sort((a, b) => {
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
