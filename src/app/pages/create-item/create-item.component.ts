import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Http } from '@angular/http';
import { FbPagesService } from '../../@core/data/fbpages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ActivatedRoute } from '@angular/router';
import { debuglog } from 'util';
import config from "../../config/config.json";

declare let window: any;
declare let FB: any;

@Component({
  selector: 'ngx-create-item',
  styleUrls: ['./create-item.component.scss'],
  templateUrl: './create-item.component.html',
})
export class CreateItemComponent {
  botId;
  item = {
    subtitle: "",
    title: "",
    price: "",
    currency: "",
    order: "",
    image_url: "",
    id: "",
    buttons: [{type: "", payload: "", url: ""}]
  };
  categories = [];
  selectedCategory = {};
  category_id;
  item_id;
  buttonType: string;
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
            config.url + "/bots/" +
            that.botId +
            "/categories?access_token=" +
            that.accessToken
          )
          .map(response => response.json())
          .subscribe(res => {
            that.categories = res;
            if (that.category_id) {
              that.categories = that.categories.map((category) => {
                if (category.id == that.category_id) {
                  that.selectedCategory = category.id;
                }
                return category;
              });
            } else {
              that.selectedCategory = that.categories[0].id;
            }

          });

        if (that.item_id) {
          that.http
            .get(
              config.url + "/bots/" +
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

              if(that.item.buttons && that.item.buttons[0]){
                that.buttonType = that.item.buttons[0].type;
              }else {
                that.item.buttons = [];
              }

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

  onCategoryChange(category) {
    this.selectedCategory = category.id;
  }

  onChangeButtonType($event) {
    if(this.item.buttons && this.item.buttons.length > 0){
      delete this.item.buttons[0].url;
      delete this.item.buttons[0].payload;
    }

    this.buttonType = $event;

  }

  save() {
    this.item["category_id"] = this.selectedCategory;

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

    if(this.item.buttons && this.item.buttons.length > 0 && Object.keys(this.item.buttons[0]).length != 3){
      alert("Button is not configured properly.");
      return;
    }

    if(this.item.buttons.length == 0){
      delete this.item.buttons;
    }

    this.http
      .post(
        config.url + "/bots/" +
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