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

  constructor(){
    var local = localStorage.getItem('zoomUser');
    if(local!= null){
    this.loggedUserData = JSON.parse(local);
    }
    console.log(this.loggedUserData.userId)
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.mService.getCarsByOwnerId(this.loggedUserData.userId).subscribe((res:any)=>{
      console.log(this.loggedUserData.userId)
      this.carLists = res.data;
    })
  }

}
