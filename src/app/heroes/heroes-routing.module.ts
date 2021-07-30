import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, data: {animation: 'heroes'} },
  { path: 'detail/:id', component: HeroDetailComponent, data: {animation: 'hero'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
