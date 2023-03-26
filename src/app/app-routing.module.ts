import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { CursosComponent } from './componentes/cursos.component';
import { EditSkillsComponent } from './componentes/edit-skills/edit-skills.component';
import { EducationComponent } from './componentes/education/education.component';
import { ExperienceComponent } from './componentes/experience/experience.component';
import { HomeComponent } from './componentes/home/home.component';
import { InteresEditComponent } from './componentes/interes-edit.component';
import { InterestComponent } from './componentes/interest/interest.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ProjectsComponent } from './componentes/projects/projects.component';
import { SkillsComponent } from './componentes/skills/skills.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'skills', component:SkillsComponent},
  { path: 'skills/tabla', component:EditSkillsComponent},
  { path: 'experiencias', component:ExperienceComponent},
  { path: 'educacion', component:EducationComponent},
  { path: 'proyectos', component:ProjectsComponent},
  { path: 'intereses', component:InterestComponent},
  { path: 'intereses/tabla', component:InteresEditComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'contacto', component: ContactComponent},
  { path: 'perfil', component:PerfilComponent},
  { path: 'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
