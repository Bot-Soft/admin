import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-orders-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class OrdersCardComponent implements OnDestroy {

  @Input() image: string;
  @Input() title: string;
  @Input() details: any[];
  @Input() price: string;
  @Input() avatar: string;
  @Input() name: string;
  // @Input() status: string;

  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
