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
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditSkillsComponent } from './componentes/edit-skills/edit-skills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { InteresEditComponent } from './componentes/interes-edit.component';
import { CursosComponent } from './componentes/cursos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { LoginComponent } from './componentes/auth/login.component';
import { interceptorProvider } from './servicios/interceptor.service';
import { CommonModule, Location } from '@angular/common';




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
    EditSkillsComponent,
    HomeComponent,
    InteresEditComponent,
    CursosComponent,
    PerfilComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule 
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
