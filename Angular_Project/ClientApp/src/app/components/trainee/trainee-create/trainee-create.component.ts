import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../models/course';
import { Trainee } from '../../../models/trainee';
import { DataService } from '../../../services/data.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-trainee-create',
  templateUrl: './trainee-create.component.html',
  styleUrls: ['./trainee-create.component.css']
})
export class TraineeCreateComponent implements OnInit {
  picFile!: File;
  trainee: Trainee = new Trainee();
  traineeForm: FormGroup = new FormGroup({
    traineeName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', Validators.required),
    admitDate: new FormControl('',Validators.required),
    gender: new FormControl('Male', Validators.required),
    picture: new FormControl(undefined, Validators.required),
    courseId: new FormControl('', Validators.required)
  });
  courses: Course[] = [];
  get f() {
    return this.traineeForm.controls;
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  insert(): void {
    if (this.traineeForm.invalid) return;
    console.log(this.traineeForm.value);
    Object.assign(this.trainee, this.traineeForm.value);
    console.log(this.trainee);
    this.trainee.traineeName = this.f.traineeName.value;
    this.trainee.email = this.f.email.value;
    this.trainee.admitDate = this.f.admitDate.value;
    this.trainee.admitDate = new Date(<string>this.datepipe.transform(this.trainee.admitDate, "yyyy-MM-dd"));
    this.trainee.picture = 'no-pic.png';
    this.trainee.gender = this.f.gender.value;
    this.trainee.courseId = this.f.courseId.value;
    this.dataService.postTrainee(this.trainee)
      .subscribe(m => {
        this.upload(Number(m.traineeId));
      }, err => {
        this.notify.fail("Failed to save data", "DISMISS");
      });
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.dataService.upload(id, this.picFile)
        .subscribe(r => {
          this.trainee.picture = r.imagePath;
          this.notify.success("Succeeded to save data", "DISMISS");
         
        }, err => {
          this.notify.fail("Failed to upload picture", "DISMISS");
        })
    })
    reader.readAsDataURL(this.picFile);
  }
  constructor(
    private dataService: DataService,
    private notify: NotifyService,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dataService.getCourse()
      .subscribe(r => {
        this.courses = r;
      }, err => {
        this.notify.fail("Failed to load data.", "DISMISS");

      })
  }


}
