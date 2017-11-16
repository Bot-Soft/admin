import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'categories',
    component: CategoriesComponent,
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
