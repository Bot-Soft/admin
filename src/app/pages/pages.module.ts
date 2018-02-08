import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LoginModule } from './login/login.module';
import { CategoriesModule } from './categories/categories.module';
import { MessagesModule } from './messages/messages.module';
import { ImagesModule } from './images/images.module';
import { ItemsModule } from './items/items.module';
import { PeopleModule } from './people/people.module';
import { SettingsModule } from './settings/settings.module';
import { PurchasesModule } from './purchases/purchases.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    LoginModule,
    PagesRoutingModule,
    ThemeModule,
    CategoriesModule,
    MessagesModule,
    PurchasesModule,
    ImagesModule,
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
