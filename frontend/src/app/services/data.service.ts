//import { Data } from './../models/data';
/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}*/

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';;
import { Idata } from './../models/IData';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  url = 'http://localhost:8000/api/teste';

  constructor(private httpClient: HttpClient){

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllData(): Observable<any> {
    return this.httpClient.get(this.url, this.httpOptions);
  }

  createData(data: Idata): Observable<any> {
    return this.httpClient.post(this.url, data, this.httpOptions);
  }

  editData(data: Idata): Observable<any> {
    return this.httpClient.put(this.url + '/' + data.id, data, this.httpOptions);
  }

  deleteData(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id, this.httpOptions)
  }
}

