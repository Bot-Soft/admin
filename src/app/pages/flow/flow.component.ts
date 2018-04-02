import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import config from "../../config/config.json";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal/modal.component";
declare let window: any;
declare let FB: any;

@Component({
  selector: "ngx-flow",
  styleUrls: ["./flow.component.scss"],
  templateUrl: "./flow.component.html"
})
export class FlowComponent {
  blocks;
  botId;
  accessToken;
  isInitial;
  constructor(private http: Http, private route: ActivatedRoute, private modalService: NgbModal) {
    let that = this;
    this.botId = this.route.parent.snapshot.params.id;
    this.isInitial = this.route.parent.snapshot.queryParams.initial;

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        that.accessToken = response.authResponse.accessToken;

        let botId = that.route.parent.snapshot.params.id;

        that.http.get(config.url + '/bots/' + botId + '?access_token=' + that.accessToken)
          .map(response => response.json()).subscribe(res => {
           
            let flow = res.blocks.template.flow;
            var blocksArray = Object.keys(flow).map(index => {
              let block = {};
              block["steps"] = flow[index];
              block["index"] = index;

              block["title"] = that.capitalizeFirstLetter(index).replace("-", " ");

              return block;
            });

            that.blocks = blocksArray;
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  save() {
    let blockObj = {};
    for(let idx = 0; idx < this.blocks.length; idx++){
      let element = this.blocks[idx];
      blockObj[element.index] = element.steps;
    }

    this.http
      .post(
        config.url + "/bots/" +
        this.botId +
        "/flow?access_token=" +
        this.accessToken,
        blockObj
      )
      .map(response => response.json())
      .subscribe(res => {
        var x = document.getElementById("snackbar")
        x.className = "show";
        x.textContent = "Saved Successfully";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

      });
  }

  // receiveDeleteMessage($event) {
  //   this.categories = this.categories.filter((category) => {
  //     return category.id != $event;
  //   });
  // }

  // create() {
  //   if (this.categories.length < 10) {
  //     window.location.replace("#/bot/" + this.botId + "/category");
  //   }
  //   else {
  //     var x = document.getElementById("snackbar")
  //     x.className = "show";
  //     x.textContent = "The MAX number of categories is reached";
  //     setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  //   }
  // }
}
