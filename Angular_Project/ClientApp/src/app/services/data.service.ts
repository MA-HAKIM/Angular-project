import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { ImagePathResponse } from '../models/image-path-response';
import { Trainee } from '../models/trainee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/Courses');
  }
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`/api/Courses/${id}`);
  }
  postCourse(data: Course): Observable<Course> {
    return this.http.post<Course>(`/api/Courses`, data);
  }
  putCourse(data: Course): Observable<any> {
    return this.http.put<any>(`/api/Courses/${data.courseId}`, data);
  }
  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`/api/Courses/${id}`);
  }
  /////////////////////////////////////////////////////
  getTrainees(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('/api/Trainees');
  }
  getTraineeById(id: number): Observable<Trainee> {
    return this.http.get<Trainee>(`/api/Trainees/${id}`);
  }
  postTrainee(data: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(`/api/Trainees`, data);
  }
  putTrainee(data: Trainee): Observable<any> {
    return this.http.put<any>(`/api/Trainees/${data.traineeId}`, data);
  }

  deleteTrainee(id: number): Observable<Trainee> {
    return this.http.delete<Trainee>(`/api/Trainees/${id}`);
  }
  upload(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePathResponse>(`/api/Trainees/Uploads/${id}`, formData);
  }
}
