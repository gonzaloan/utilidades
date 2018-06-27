import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../_animations/router.animations';


@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
