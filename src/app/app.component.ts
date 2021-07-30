import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'Tour Of Heroes';
  getAnimationData(outlet: RouterOutlet): any{
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
