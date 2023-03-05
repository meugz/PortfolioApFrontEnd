import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { HeaderIntroComponent } from './componentes/header-intro/header-intro.component';
import { SocialMediaComponent } from './componentes/social-media/social-media.component';
import { AboutComponent } from './componentes/about/about.component';
import { ExperienceComponent } from './componentes/experience/experience.component';
import { EducationComponent } from './componentes/education/education.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { InterestComponent } from './componentes/interest/interest.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProjectsComponent } from './componentes/projects/projects.component';
import { ButtonsComponent } from './componentes/buttons/buttons.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    HeaderIntroComponent,
    SocialMediaComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    InterestComponent,
    ContactComponent,
    FooterComponent,
    ProjectsComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
