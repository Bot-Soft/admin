import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { PurchasesComponent } from './purchases.component';
import { PurchasesCardComponent } from './card/card.component';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    PurchasesComponent,
    PurchasesCardComponent,
  ],
})
export class PurchasesModule { }
