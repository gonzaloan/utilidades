import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(public _persona: PersonasService) { }

  ngOnInit() {
    console.log("En init...");
    this._persona.getPersonas().subscribe();
  }

}
