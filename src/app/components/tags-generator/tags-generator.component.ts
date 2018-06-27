import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../_animations/router.animations';

@Component({
  selector: 'app-tags-generator',
  templateUrl: './tags-generator.component.html',
  styleUrls: ['./tags-generator.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class TagsGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
