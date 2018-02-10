import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-orders-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class OrdersCardComponent {

  @Input() image: string;
  @Input() title: string;
  @Input() details: any[];
  @Input() price: string;
  @Input() avatar: string;
  @Input() name: string;

  currentTheme: string;
  themeSubscription: any;

  constructor() {

  }
}
