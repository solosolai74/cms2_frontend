import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
  
})
export class ExamDetailsService {

  constructor(private readonly http: HttpClient) { 
    console.log('ExamDetailsService initialized');

  }

  // Exam Details API 
  addExamDetails(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-details'),
      data
    );
  }

  viewExamDetails(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/exam-details-list'),
      {}
    );
  }
  
  editExamDetails(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-details-update'),
      data
    );
  }

  deleteExamDetails(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-details-delete'),
      data
    );
  }
  
  
  // Slot API 

  AddExamSlot(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-slot'),
      data
    );
  }

  viewExamSlot(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/exam-slot-list'),
      {}
    );
  }

  editExamSlot(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-slot-update'),
      data
    );
  }

  deleteExamSlot(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-slot-delete'),
      data
    );
  }

  

  // Slot API 

  addPaperType(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-papertype'),
      data
    );
  } 

  viewPaperType(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/exam-papertype-list'),
      {}
    );
  }  

  editPaperType(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-papertype-update'),
      data
    );
  }  

  deletePaperType(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-papertype-delete'),
      data
    );
  }

  // Exam Mode

  addExamMode(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-mode'),
      data
    );
  }   

  viewExamMode(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/exam-mode-list'),
      {}
    );
  }  

  editExamMode(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-mode-update'),
      data
    );
  }   

  deleteExamMode(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/exam-mode-delete'),
      data
    );
  }   

}
