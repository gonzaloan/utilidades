import { Component, Inject } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { fadeAnimation } from './_animations/fadein.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation] // register the animation
})
export class AppComponent {

  constructor(private alertService: AlertService) { 

  }

  
}
