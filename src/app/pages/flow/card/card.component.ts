import { AfterViewInit, Component, Input, OnDestroy, EventEmitter, Output, ViewChild } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
declare let window: any;
declare let FB: any;
declare const echarts: any;
import config from "../../../config/config.json";

@Component({
  selector: "ngx-flow-card",
  styleUrls: ["./card.component.scss"],
  templateUrl: 'card.component.html',
})
export class FlowCardComponent implements AfterViewInit, OnDestroy {
  
  @Input() title: any;
  @Input() steps: any;
  @Output() messageEvent = new EventEmitter<string>();

  private value;

  option: any = {};
  themeSubscription: any;
  botId;
  accessToken;

  constructor(private theme: NbThemeService, private http: Http, private route: ActivatedRoute) {
    let that = this;
    this.botId = this.route.parent.snapshot.params.id;

    // this.editorOptions.mode = 'code'; //set only one mode

    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        let uid = response.authResponse.userID;
        that.accessToken = response.authResponse.accessToken;

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

  getNumberOfRows(step){
    let stepStr = JSON.stringify(step);
    let count1 = (stepStr.match(/:/g) || []).length;
    let count2 = (stepStr.match(/{/g) || []).length;

    return count1 + count2 + 1;
  }

  updateStep(idx, $event){
    this.steps[idx] = JSON.parse($event);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  moveUp(index){
    if(index == 0){
      return;
    }
    let currentStep = this.steps[index];
    this.steps[index] = this.steps[index-1];
    this.steps[index-1] = currentStep;
  }

  moveDown(index){

  }

  // delete() {

  //   if (confirm("Are you sure you want to delete this category?")) {
  //     this.http
  //       .delete(
  //       config.url + "/bots/" +
  //       this.botId +
  //       "/categories?id=" + this.category_id + "&access_token=" +
  //       this.accessToken
  //       )
  //       .map(response => response.json())
  //       .subscribe(res => {
  //         this.messageEvent.emit(this.category_id)
  //       });
  //   } else {
  //     // Do nothing!
  //   }

  // }

  ngAfterViewInit() {
    // this.value = Math.floor((this.segment / this.total) * 100);
    // this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(config => {
    //   const solarTheme: any = config.variables.solar;
    //   this.option = Object.assign({}, {
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b} : {c} ({d}%)',
    //     },
    //     series: [
    //       {
    //         name: ' ',
    //         clockWise: true,
    //         hoverAnimation: false,
    //         type: 'pie',
    //         center: ['45%', '50%'],
    //         radius: solarTheme.radius,
    //         data: [
    //           {
    //             value: this.value,
    //             name: ' ',
    //             label: {
    //               normal: {
    //                 position: 'center',
    //                 formatter: '{d}%',
    //                 textStyle: {
    //                   fontSize: '22',
    //                   fontFamily: config.variables.fontSecondary,
    //                   fontWeight: '600',
    //                   color: config.variables.fgHeading,
    //                 },
    //               },
    //             },
    //             tooltip: {
    //               show: false,
    //             },
    //             itemStyle: {
    //               normal: {
    //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                   {
    //                     offset: 0,
    //                     color: solarTheme.gradientLeft,
    //                   },
    //                   {
    //                     offset: 1,
    //                     color: solarTheme.gradientRight,
    //                   },
    //                 ]),
    //                 shadowColor: solarTheme.shadowColor,
    //                 shadowBlur: 0,
    //                 shadowOffsetX: 0,
    //                 shadowOffsetY: 3,
    //               },
    //             },
    //             hoverAnimation: false,
    //           },
    //           {
    //             value: 100 - this.value,
    //             name: ' ',
    //             tooltip: {
    //               show: false,
    //             },
    //             label: {
    //               normal: {
    //                 position: 'inner',
    //               },
    //             },
    //             itemStyle: {
    //               normal: {
    //                 color: config.variables.layoutBg,
    //               },
    //             },
    //           },
    //         ],
    //       },
    //       {
    //         name: ' ',
    //         clockWise: true,
    //         hoverAnimation: false,
    //         type: 'pie',
    //         center: ['45%', '50%'],
    //         radius: solarTheme.radius,
    //         data: [
    //           {
    //             value: this.value,
    //             name: ' ',
    //             label: {
    //               normal: {
    //                 position: 'inner',
    //                 show: false,
    //               },
    //             },
    //             tooltip: {
    //               show: false,
    //             },
    //             itemStyle: {
    //               normal: {
    //                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                   {
    //                     offset: 0,
    //                     color: solarTheme.gradientLeft,
    //                   },
    //                   {
    //                     offset: 1,
    //                     color: solarTheme.gradientRight,
    //                   },
    //                 ]),
    //                 shadowColor: solarTheme.shadowColor,
    //                 shadowBlur: 7,
    //               },
    //             },
    //             hoverAnimation: false,
    //           },
    //           {
    //             value: 100,
    //             name: ' ',
    //             tooltip: {
    //               show: false,
    //             },
    //             label: {
    //               normal: {
    //                 position: 'inner',
    //               },
    //             },
    //             itemStyle: {
    //               normal: {
    //                 color: 'none',
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   });
    // });
  }

  ngOnDestroy() {
    // this.themeSubscription.unsubscribe();
  }
}
