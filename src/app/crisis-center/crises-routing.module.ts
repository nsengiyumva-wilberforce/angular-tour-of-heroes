import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../can-deactivate.guard';

import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

const routes: Routes = [
  { path: '',
    component: CrisisCenterComponent,
    children: [
      { path: '',
        component: CrisisListComponent,
      children: [
        { path: ':id',
        component: CrisisDetailComponent,
        resolve: {
          crisis: CrisisDetailResolverService
        }
    },
      { path: '',
    component: CrisisCenterHomeComponent}
      ]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrisesRoutingModule { }
