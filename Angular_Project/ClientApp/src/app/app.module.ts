import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { MatModule } from './modules/common/mat/mat.module';
import { HttpClientModule } from '@angular/common/http';
import { CourseViewComponent } from './components/course/course-view/course-view.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { TraineeViewComponent } from './components/trainee/trainee-view/trainee-view.component';
import { TraineeCreateComponent } from './components/trainee/trainee-create/trainee-create.component';
import { TraineeEditComponent } from './components/trainee/trainee-edit/trainee-edit.component';
import { DataService } from './services/data.service';
import { NotifyService } from './services/notify.service';
import { FormsModule } from '@angular/forms';
import { MainNavComponent } from './components/nav/main-nav/main-nav.component';
import { DeleteCourseComponent } from './components/course/delete-course/delete-course.component';
import { DeleteTraineeComponent } from './components/trainee/delete-trainee/delete-trainee.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseViewComponent,
    CourseCreateComponent,
    CourseEditComponent,
    TraineeViewComponent,
    TraineeCreateComponent,
    TraineeEditComponent,
    MainNavComponent,
    DeleteCourseComponent,
    DeleteTraineeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule   
  ],
  entryComponents: [DeleteCourseComponent, DeleteTraineeComponent],
  providers: [DataService, NotifyService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
