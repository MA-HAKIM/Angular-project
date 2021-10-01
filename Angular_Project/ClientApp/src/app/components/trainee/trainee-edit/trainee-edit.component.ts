import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course';
import { Trainee } from '../../../models/trainee';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-trainee-edit',
  templateUrl: './trainee-edit.component.html',
  styleUrls: ['./trainee-edit.component.css']
})
export class TraineeEditComponent implements OnInit {

  picFile!: File;
  trainee!: Trainee;
  traineeForm: FormGroup = new FormGroup({
    traineeName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', Validators.required),
    admitDate: new FormControl(undefined, Validators.required),
    gender: new FormControl('Male', Validators.required),
    picture: new FormControl(undefined, Validators.required),
    courseId: new FormControl('', Validators.required)
  });
  courses: Course[] = [];
  constructor(
    private dataSvc: DataService,
    private notifySvc: NotifyService,
    private datePipe: DatePipe,
    private actvatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.traineeForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  update(): void {
    if (this.traineeForm.invalid) return;
    console.log(this.traineeForm.value);

    this.trainee.traineeName = this.f.traineeName.value
    this.trainee.email = this.f.email.value
    this.trainee.admitDate = this.f.admitDate.value
    this.trainee.admitDate = new Date(<string>this.datePipe.transform(this.trainee.admitDate, "yyyy-MM-dd"));
    this.trainee.gender = this.f.gender.value
    this.trainee.courseId = this.f.courseId.value
    console.log(this.trainee);

    this.dataSvc.putTrainee(this.trainee)
      .subscribe(a => {
        if (this.picFile != null && this.trainee.traineeId) {
          this.upload(Number(this.trainee.traineeId))
        }
        else {
          this.notifySvc.fail("Succeeded to save data", "DISMISS");
        }
      }, err => {
        this.notifySvc.fail("Failed to save data", "DISMISS");
      });
  }
  upload(id: number): void {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataSvc.upload(id, this.picFile)
        .subscribe(r => {
          this.trainee.picture = r.imagePath;
          this.notifySvc.success("Succeeded to save data", "DISMISS");

        }, err => {
          this.notifySvc.fail("Failed to upload image", "DISMISS");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  ngOnInit(): void {
    let id: number = this.actvatedRoute.snapshot.params.id;
    this.dataSvc.getTraineeById(id).
      subscribe(r => {
        this.trainee = r;
        this.traineeForm.patchValue(this.trainee);
      }, err => {
        this.notifySvc.fail("Faild to load data", "DISMISS");
      })
    this.dataSvc.getCourse()
      .subscribe(r => {
        this.courses = r;
      }, err => {
        this.notifySvc.fail("Failed to load data", "DISMISS");
      });
  }
}
