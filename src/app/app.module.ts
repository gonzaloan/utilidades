import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RunComponent } from './components/run/run.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Rutas
import { APP_ROUTING } from './app.routes';
import { ValidarunPipe } from './pipes/validarun.pipe';
import { TagsGeneratorComponent } from './components/tags-generator/tags-generator.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RunComponent,
    NotfoundComponent,
    LoadingComponent,
    ValidarunPipe,
    TagsGeneratorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
