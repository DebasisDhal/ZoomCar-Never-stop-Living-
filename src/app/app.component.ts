import { Component, inject } from '@angular/core';
import { MasterServicesService } from './services/master-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZOOMCAR';
  mService = inject(MasterServicesService)

  formObj:any = {
    userId: 0,
    name: "",
    userRole: "",
    emailId: "",
    mobileNo: "",
    password: "",
    createdOn: new Date()
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
    return this.mService.sendData(this.formObj).subscribe((res)=>{
      if(res.result){
        alert("user resgistation sucessfully");
      }else{
        alert("Check your input")
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
}
