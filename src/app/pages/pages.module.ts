import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { PeopleModule } from './people/people.module';
import { SettingsModule } from './settings/settings.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    CategoriesModule,
    SettingsModule,
    ItemsModule,
    PeopleModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
