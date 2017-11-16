import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CategoriesComponent } from './categories/categories.component';
import { ItemsComponent } from './items/items.component';
import { PeopleComponent } from './people/people.component';

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
    path: 'people',
    component: PeopleComponent,
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
