import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CategoriesComponent } from './categories/categories.component';
import { MessagesComponent } from './messages/messages.component';
import { ImagesComponent } from './images/images.component';
import { ItemsComponent } from './items/items.component';
import { PeopleComponent } from './people/people.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'categories',
    component: CategoriesComponent,
  }, {
    path: 'items',
    component: ItemsComponent,
  }, {
    path: 'messages',
    component: MessagesComponent,
  }, {
    path: 'images',
    component: ImagesComponent,
  }, {
    path: 'people',
    component: PeopleComponent,
  }, {
    path: 'settings',
    component: SettingsComponent,
  }, {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
