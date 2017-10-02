import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ResourceServices{

    constructor(private http: Http) {
    }

    public getJSON(fileName: string): Observable<any> {
         return this.http.get("assets/"+fileName+".json")
                         .map((res:any) => res.json())

     }

     public getHtml(fileName: string): Observable<any> {
        return this.http.get(fileName)
        .map((res:any) => res);

     }
}