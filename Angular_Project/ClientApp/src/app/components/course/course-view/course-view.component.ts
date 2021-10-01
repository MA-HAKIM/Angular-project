import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../models/course';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { DeleteCourseComponent } from '../delete-course/delete-course.component';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  courses: Course[] = [];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource(this.courses);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  columnList = ['courseName', 'round', 'actions'];             
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private delDialog:MatDialog
  ) { }

  confirmDelete(course: Course): void {
    this.delDialog.open(DeleteCourseComponent, {
      width: '400px'
    }).afterClosed()
      .subscribe(r => {
        if (r) {
          this.dataSvc.deleteCourse(Number(course.courseId))
            .subscribe(r => {
              this.dataSource.data = this.dataSource.data.filter(x => x.courseId != course.courseId);
            }, err => {
              this.notifySvc.fail("Data delete failed.Because course have a trainee.", "DISMISS");
            });
        }
        else {
          
        }
      });
  }

  ngOnInit(): void {
    this.dataSvc.getCourse()
      .subscribe(r => {
        this.courses = r;
        this.dataSource.data = this.courses;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {

      })
  }

}
