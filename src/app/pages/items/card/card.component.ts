import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-items-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class ItemsCardComponent implements OnDestroy {

  @Input() image: string;
  @Input() title: string;
  @Input() text: string;
  @Input() price: string;
  @Input() sellrate: string;

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