import { Component, inject, model } from '@angular/core';
import { MasterServicesService } from './services/master-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZOOMCAR';
  mService = inject(MasterServicesService)
  loggedUserObj:any;


  constructor(){
    var local = localStorage.getItem('zoomUser');
    if(local != null){
      this.loggedUserObj = JSON.parse(local);
    }
  }
  

  formObj:any = {
    "userId": 0,
    "name": "",
    "userRole": "",
    "emailId": "",
    "mobileNo": "",
    "password": "",
    "createdOn": new Date()
  }
  loginObj:any={
    "userId": 0,
  "name": "111",
  "userRole": "111",
  "emailId": "",
  "mobileNo": "111",
  "password": "",
  "createdOn": new Date()

  }

  onReset(){
    this.formObj = {
      userId: 0,
      name: "",
      userRole: "",
      emailId: "",
      mobileNo: "",
      password: "",
      createdOn: new Date()
    }
  
  }

  onSubmit(){
     this.mService.registerUser(this.formObj).subscribe((res:any)=>{
      if(res.result){ 
        alert(res.message)
        this.closeModal();
        this.loggedUserObj = res.data;
      }else{
        alert(res.message);
      }
    })
  }

  onClear(){
    this.loginObj={
      "userId": 0,
      "name": "",
      "userRole": "",
      "emailId": "",
      "mobileNo": "",
      "password": "",
      "createdOn": new Date()
    }
  }
  onLogin(){
    this.mService.loginUser(this.loginObj).subscribe((res:any)=>{
      if(res.data){
        alert(res.message);
        this.closeLoginModal();
        localStorage.setItem('zoomUser',JSON.stringify(res.data))
        this.loggedUserObj = res.data;
      }else{
        alert(res.message)
      }
    })

  }

  openModal(){
    const model =document.getElementById('myModal');
    if(model != null){
      model.style.display = 'block'
    }
  }
  closeModal(){
    const model =document.getElementById('myModal');
    if(model != null){
      model.style.display = 'none'
    }
  }

  loginModal(){
    const model = document.getElementById('myModalLogin');
    if(model != null){
      model.style.display = 'block'
    }
  }
  closeLoginModal(){
    const model = document.getElementById('myModalLogin');
    if(model != null){
      model.style.display = 'none'
    }
  }
  logOff(){
    localStorage.removeItem('zoomUser');
    this.loggedUserObj =undefined;
  }
}
