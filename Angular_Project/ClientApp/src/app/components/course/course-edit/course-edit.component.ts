import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  course: Course = new Course();
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  update(f: NgForm): void {
    if (f.invalid) return;
    this.dataSvc.putCourse(this.course)
      .subscribe(r => {
        this.notifySvc.success("Data update successfully", "DISMISS")
      }, err => {
        this.notifySvc.fail("Failed to update data", "DISMISS")
      })
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id
    this.dataSvc.getCourseById(id)
      .subscribe(r => {
        this.course = r;
      }, err => {
        this.notifySvc.fail("Failed to fetch data from server", "DISMISS")
      })
    console.log(id);
  }


}
