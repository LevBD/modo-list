import { Injectable } from '@angular/core';
import { BaseApi } from '../classes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseApi {
  constructor(protected http: HttpClient) {
    super(http);
  }

  public getTasks(): Observable<any> {
    return this.get('https://modo-7e53f-default-rtdb.europe-west1.firebasedatabase.app/tasks.json');
  }

  public getTask(id: string): Observable<any> {
    return this.get(`https://modo-7e53f-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`);
  }

  public createTask(payload: Task): Observable<any> {
    return this.post('https://modo-7e53f-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', payload);
  }

  public updateTask(id: string | undefined, payload: Task): Observable<any> {
    return this.patch(`https://modo-7e53f-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`, payload);
  }

  public deleteTask(id: string | undefined): Observable<any> {
    return this.delete(`https://modo-7e53f-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`);
  }
}
