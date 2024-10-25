import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentreDeviceDetailsService {

  constructor(private readonly http: HttpClient) { }

  // Common
  examName(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/examcode-list'),
      {}
    );
  }

  // Region 
  addExamRegion(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/region-view'),
      data
    );
  }

  viewExamRegion(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/region-view-list'),
      {}
    );
  }

  editExamRegion(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/region-view-update'),
      data
    );
  }

  deleteExamRegion(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/region-view-delete'),
      data
    );
  }

  // State 
  addExamState(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/state-view'),
      data
    );
  }

  viewExamState(): Observable<any> {
    return this.http.get(
      env.apiHost.concat('/exam/state-view-list'),
      {}
    );
  }

  editExamState(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/state-view-update'),
      data
    );
  }

  deleteExamState(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/state-view-delete'),
      data
    );
  }

  regionLists(data: any): Observable<any> {
    return this.http.post(
      env.apiHost.concat('/exam/region-dropdown-list'),
      data
    );
  }

    // City 
    addExamCity(data: any): Observable<any> {
      return this.http.post(
        env.apiHost.concat('/exam/city-view'),
        data
      );
    }

    ViewExamCity(): Observable<any> {
      return this.http.get(
        env.apiHost.concat('/exam/city-view-list'),
        {}
      );
    }

    editExamCity(data: any): Observable<any> {
      return this.http.post(
        env.apiHost.concat('/exam/city-view-update'),
        data
      );
    }

    deleteExamCity(data: any): Observable<any> {
      return this.http.post(
        env.apiHost.concat('/exam/city-view-delete'),
        data
      );
    }

    stateList(data: any): Observable<any> {
      return this.http.post(
        env.apiHost.concat('/exam/state-dropdown-list'),
        data
      );
    }

}
