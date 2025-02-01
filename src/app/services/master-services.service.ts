import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class MasterServicesService {

  constructor(private http:HttpClient) { 
    
  }
 private api_url ="https://freeapi.miniprojectideas.com/api/ZoomCar"

 sendData(obj:any):Observable<any>{
   return this.http.post(this.api_url+'/AddNewUser',obj);
 }


}
