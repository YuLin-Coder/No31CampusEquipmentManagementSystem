import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private headers = new Headers({'Content-Type': 'application/json'}); 
  constructor(
    private httpClient:HttpClient
  ) { }

  public qrpath = "assets/image/QRcode/"
  public manualFilePath = "assets/file/manual_file/"
  
  myPost(url, data):Observable<any>{
     return this.httpClient.post(url,data,httpOptions)
  }

  myGet(url):Observable<any>{
    return this.httpClient.get(url,httpOptions);
  }
  public dateToString(date:Date){
    let year = date.getFullYear();
    let month =(date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    let dateTime = year + "-" + month + "-" + day;
    return dateTime;
  }
  public setUsername(value){
     localStorage.setItem("username",value);
  }
  public getUsername(){
    return localStorage.getItem("username");
  }
}
