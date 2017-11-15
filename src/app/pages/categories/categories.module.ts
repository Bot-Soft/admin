import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { CategoriesComponent } from './categories.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    CategoriesComponent,
    ChartComponent,
  ],
})
export class CategoriesModule { }
