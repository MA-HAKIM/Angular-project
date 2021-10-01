import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../../models/course';
import { Trainee } from '../../../models/trainee';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';
import { DeleteTraineeComponent } from '../delete-trainee/delete-trainee.component';


@Component({
  selector: 'app-trainee-view',
  templateUrl: './trainee-view.component.html',
  styleUrls: ['./trainee-view.component.css']
})
export class TraineeViewComponent implements OnInit {
  trainees: Trainee[] = [];
  courses: Course[] = [];
  dataSource: MatTableDataSource<Trainee> = new MatTableDataSource(this.trainees);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["traineeName", "picture", "email", "admitDate", "course", "gender", "actions"];
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Trainee): void {
    this.dialog.open(DeleteTraineeComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r)
        this.dataSvc.deleteTrainee(Number(item.traineeId))
          .subscribe(x => {
            this.notifySvc.success("Data deleted", "DISMISS");
            this.dataSource.data = this.dataSource.data.filter(d => d.traineeId != x.traineeId);
          }, err => {
            this.notifySvc.fail("Data delete failed.", "DISMISS");
          });
      
    })
  }
  getCourseName(id: number): string|undefined {
    let c = this.courses.find(c => c.courseId == id);
    return c ? c.courseName : '';
  }
  ngOnInit(): void {
    this.dataSvc.getTrainees()
      .subscribe(r => {
        this.trainees = r;
        this.dataSource.data = this.trainees;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {

      });
    this.dataSvc.getCourse().
      subscribe(x => {
        this.courses = x;
      }, err => {

      });
  }

}
