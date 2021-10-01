import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { HomeComponent } from './components/home/home.component';
import { TraineeCreateComponent } from './components/trainee/trainee-create/trainee-create.component';
import { TraineeEditComponent } from './components/trainee/trainee-edit/trainee-edit.component';
import { TraineeViewComponent } from './components/trainee/trainee-view/trainee-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'trainees', component: TraineeViewComponent },
  { path: 'trainee-add', component: TraineeCreateComponent },
  { path: 'trainee-edit/:id', component: TraineeEditComponent },
  { path: 'courses', component: CourseViewComponent },
  { path: 'course-add', component: CourseCreateComponent },
  { path: 'course-edit/:id', component: CourseEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
