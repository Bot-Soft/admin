import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Http } from '@angular/http';
import { FbPagesService } from '../../@core/data/fbpages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import config from "../../config/config.json";

declare let window: any;
declare let FB: any;

@Component({
  selector: 'ngx-fbpages',
  styleUrls: ['./fbpages.component.scss'],
  templateUrl: './fbpages.component.html',
})
export class FbPagesComponent implements OnInit, OnDestroy {

  fbpages: Observable<any[]>;
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private fbPagesService: FbPagesService,
    private http: Http) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

  }

  ngOnInit() {
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

        console.log("UID: " + uid);
        console.log("accessToken: " + accessToken);

        that.http.get(config.url + '/pages?access_token=' + accessToken)
          .map(response => response.json()).subscribe(res => {
            that.fbpages = res;
          }
          );

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

  setup(pageId, pageName, pageAccessToken) {
    console.log(pageId);
    console.log(pageAccessToken);

    FB.api("/me", (response) => {
      this.http.post(config.url + '/setup', {
        page_id: pageId,
        access_token: pageAccessToken,
        user_id: response.id,
        name: pageName
      }).subscribe(
        res => {
          console.log(res);
          window.location.replace("#/bot/"+pageId+"/categories");
        },
        err => {
          console.log(err);
        }
        );
    });

  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}