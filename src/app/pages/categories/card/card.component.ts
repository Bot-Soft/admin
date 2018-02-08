import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";

declare const echarts: any;

@Component({
  selector: "ngx-categories-card",
  styleUrls: ["./card.component.scss"],
  template: `
  <nb-card size="small">
  <nb-card-body>
    <div class="picture" style.background-image="url({{image}})"></div>

    <div class="details">
      <div class="title">
        {{title}}
      </div>
      <div class="description">
        {{subtitle}}
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
  <nb-actions size="medium" fullWidth>
    <nb-action>
      <a href="#">Edit</a>
    </nb-action>
    <nb-action>
    <a href="{{items_url}}"><b>Items</b></a>
  </nb-action>
    <nb-action>
    <a href="#">Delete</a>
  </nb-action>
  </nb-actions>
</nb-card-footer>
</nb-card>
  `
})
export class CategoriesCardComponent implements AfterViewInit, OnDestroy {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() image: string;
  @Input() items_url: string;

  private value;

  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {}

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
