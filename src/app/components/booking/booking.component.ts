import { Component, inject, OnInit } from '@angular/core';
import { MasterServicesService } from '../../services/master-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  mservice = inject(MasterServicesService)
  carId:number =0;
  locationId:any;
  carData: any;
  fromLocation:String = '';
locations: any;
toLocation: String = '';
loggedUserObj:any;


formObj={
    "bookingId": 0,
    "customerId": 0,
    "fromLocationId": 0,
    "toLocationId": 0,
    "travelDate": "2025-02-12T06:45:19.962Z",
    "startTime": "",
    "carId": 0,
    "pickupAddress": "",
    "alternateContactNo": "",
    "invoiceNo": "",
    "isComplete": false
  
};

  constructor(private acivateRoute:ActivatedRoute){
    this.acivateRoute.params.subscribe(res=>{
      this.locationId = res['locationId'];
      this.carId = res['carId'];
      this.formObj.carId = this.carId;
    })
    this.carDetails();
    const local =localStorage.getItem('zoomUser');
    if(local != null){
      this.loggedUserObj = JSON.parse(local);
      this.formObj.customerId = this.loggedUserObj.userId;
    }
   
  }
  
  ngOnInit(): void {
  this.locationDetails();
  }

  carDetails(){
    this.mservice.getCarById(this.carId).subscribe((res:any)=>{
      this.carData = res.data;
    })
  }

  locationDetails(){
    this.mservice.getLocation().subscribe((res:any)=>{
      this.locations = res.data; 
    })
  }
onSave(){
  this.mservice.createNewBooking(this.formObj).subscribe((Res:any)=>{
    if(Res.result){
    alert("Your Booking sucessfully")
    }else{
      alert(Res.message)
    }
  })
}
}
