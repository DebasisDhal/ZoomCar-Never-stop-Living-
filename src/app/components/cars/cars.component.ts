import { Component, inject, OnInit } from '@angular/core';
import { MasterServicesService } from '../../services/master-services.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  loggedUserData:any;
  mService = inject(MasterServicesService);
  carLists: any[] = [];
  locationData: any;
  

  constructor(){
    var local = localStorage.getItem('zoomUser');
    if(local!= null){
    this.loggedUserData = JSON.parse(local);
    }
    console.log(this.loggedUserData.userId)
  }

  ngOnInit(): void {
    this.getCars();
    this.location();
    
  }

carObj:any ={
    "carId": 0,
    "brand": "",
    "name": "",
    "pricingDescription": "",
    "pricing": 0,
    "locationId": 0,
    "registeredOn": "2025-02-08T10:46:40.383Z",
    "imageUrl": "",
    "vehicleNo": "",
    "ownerUserId": 0,
    "ZoomCarAccessoriess": [
   
    ]
}

  accessoriesObject:any={
    "accessoriesId": 0,
      "accessoriesTitle": "",
      "showOnWebsite": false,
      "carId": 0
  }

  
  getCars(){
    this.mService.getCarsByOwnerId(this.loggedUserData.userId).subscribe((res:any)=>{
      console.log(this.loggedUserData.userId)
      this.carLists = res.data;
    })
  }

  mOpen(){
    const modal = document.getElementById('myModal');
    if(modal != null){
      modal.style.display='block'
    }
  }
  mClose(){
    const modal = document.getElementById('myModal');
    if(modal != null){
      modal.style.display='none'
    }
  }
  clear(){
    this.carObj={
      "carId": 0,
      "brand": "",
      "name": "",
      "pricingDescription": "",
      "pricing": 0,
      "locationId": 0,
      "registeredOn": "2025-02-08T10:46:40.383Z",
      "imageUrl": "",
      "vehicleNo": "",
      "ownerUserId": 0,
      "ZoomCarAccessoriess": [
     
      ]
  };
  }
  add(){
    const obj = JSON.stringify(this.accessoriesObject)
    this.carObj.ZoomCarAccessoriess.push(JSON.parse(obj));
    this.accessoriesObject={
      "accessoriesId": 0,
        "accessoriesTitle": "",
        "showOnWebsite": false,
        "carId": 0
    }
  }
  location(){
    this.mService.getLocation().subscribe((res:any)=>{
      this.locationData = res.data;
    })
  }
saveCar(){
  this.carObj.ownerUserId = this.loggedUserData.userId;
  this.mService.addCar(this.carObj).subscribe((res:any)=>{
    if(res.result){
      alert("Car created");
      this.mClose();
      this.getCars();
    }else{
      alert(res.message);
    }
  })
}
}
