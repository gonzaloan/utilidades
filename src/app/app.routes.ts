import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { RunComponent } from './components/run/run.component';
import { TagsGeneratorComponent } from './components/tags-generator/tags-generator.component';
import { PersonasComponent } from './components/personas/personas.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'run', component: RunComponent },
    { path: 'tags-generator', component: TagsGeneratorComponent},
    { path: 'person', component: PersonasComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', component: NotfoundComponent },

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
