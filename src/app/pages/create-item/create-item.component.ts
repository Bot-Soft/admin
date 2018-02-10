import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Http } from '@angular/http';
import { FbPagesService } from '../../@core/data/fbpages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { debuglog } from 'util';

declare let window: any;
declare let FB: any;

@Component({
  selector: 'ngx-create-item',
  styleUrls: ['./create-item.component.scss'],
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent {
  botId;
  item = {};
  categories = [];
  selectedCategory = {};
  category_id;
  item_id;
  accessToken;
  constructor(private http: Http, private route: ActivatedRoute) {
    let that = this;
    this.botId = this.route.parent.snapshot.params.id;
    this.category_id = this.route.snapshot.queryParams.category_id;
    this.item_id = this.route.snapshot.queryParams.id;
    this.accessToken;

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        that.accessToken = response.authResponse.accessToken;

        that.http
          .get(
          "https://3klcm8k5x0.execute-api.eu-central-1.amazonaws.com/latest/bots/" +
          that.botId +
          "/categories?access_token=" +
          that.accessToken
          )
          .map(response => response.json())
          .subscribe(res => {
            that.categories = res;
            if (that.category_id) {
              that.selectedCategory = that.categories.find((category) => {
                return category.id == that.category_id;
              });
            } else {
              that.selectedCategory = that.categories[0];
            }

          });

        if (that.item_id) {
          that.http
            .get(
            "https://3klcm8k5x0.execute-api.eu-central-1.amazonaws.com/latest/bots/" +
            that.botId +
            "/items?access_token=" +
            that.accessToken
            )
            .map(response => response.json())
            .subscribe(res => {
              let currentItem = res.find((item) => {
                return item.id == that.item_id;
              });

              that.item = currentItem;

            });
        }



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

  create() {
    this.item["category_id"] = this.categories.find((category) => {
      return category.id == this.selectedCategory;
    })["id"];

    if (!this.item["title"]) {
      alert("Category title is required.");
      return;
    }

    if (!this.item["subtitle"]) {
      alert("Category subtitle is required.");
      return;
    }

    if (!this.item["image_url"]) {
      alert("Category Image URL is required.");
      return;
    }

    if (!this.item["currency"]) {
      alert("Category Currency is required.");
      return;
    }

    if (!this.item["price"]) {
      alert("Category Price is required.");
      return;
    }

    if (!this.item["category_id"]) {
      alert("Category Category ID is required.");
      return;
    }

    this.http
      .post(
      "https://3klcm8k5x0.execute-api.eu-central-1.amazonaws.com/latest/bots/" +
      this.botId +
      "/items?access_token=" +
      this.accessToken,
      this.item
      )
      .map(response => response.json())
      .subscribe(res => {
        window.location.replace("#/bot/" + this.botId + "/items?category_id=" + this.selectedCategory);

      });
  }
}