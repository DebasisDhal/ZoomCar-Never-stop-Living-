import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})
export class MasterServicesService {

  constructor(private http:HttpClient) { 
    
  }
apiEndPoint: string ="/api/ZoomCar/"

 registerUser(obj:any):Observable<any>{
   return this.http.post(this.apiEndPoint+'AddNewUser',obj);
 }
 
 loginUser(obj:any){
  return this.http.post(this.apiEndPoint+'Login',obj);
 }

 getCarsByOwnerId(userId:any){
  return this.http.get(this.apiEndPoint+'GetAllCarsByOwnerId?id='+userId)
  }
}
