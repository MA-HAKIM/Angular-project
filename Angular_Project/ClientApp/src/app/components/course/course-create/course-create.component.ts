import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from '../../../models/course';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  course: Course = new Course();
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService
  ) { }
  insert(f: NgForm): void {
    if (f.invalid) return;
    this.dataSvc.postCourse(this.course)
      .subscribe(r => {
        this.notifySvc.success("Data inserted successfully", "DISMISS")
      }, err => {
        this.notifySvc.fail("Failed to insert data", "DISMISS")
      })
  }
    ngOnInit(): void {
    }
 }
