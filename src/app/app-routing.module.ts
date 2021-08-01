import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes, UrlSegment } from '@angular/router';

import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { HeroFormComponent } from './hero-form/hero-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [AuthGuard]},
  { path: 'crisis-center', loadChildren: () => import('./crisis-center/crises.module').then(m => m.CrisesModule), data : { preload: true }},
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup'},
  { path: 'hero-form', component: HeroFormComponent},
  { path: '', redirectTo: '/heroes', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy : SelectivePreloadingStrategyService })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
