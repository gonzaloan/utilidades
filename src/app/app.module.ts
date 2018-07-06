import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RunComponent } from './components/run/run.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Import your library
import { AlertModule } from 'ngx-alerts';

//Rutas
import { APP_ROUTING } from './app.routes';
import { ValidarunPipe } from './pipes/validarun.pipe';
import { TagsGeneratorComponent } from './components/tags-generator/tags-generator.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonasService } from './components/personas/personas.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RunComponent,
    NotfoundComponent,
    LoadingComponent,
    ValidarunPipe,
    TagsGeneratorComponent,
    PersonasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages: 3, timeout: 5000}),
    APP_ROUTING
  ],
  providers: [PersonasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
