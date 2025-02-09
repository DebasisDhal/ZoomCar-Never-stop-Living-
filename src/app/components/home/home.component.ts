import { Component, inject, OnInit } from '@angular/core';
import { MasterServicesService } from '../../services/master-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  mService= inject(MasterServicesService);
  pCars:any[]=[];
  locations:any[]=[];

  ngOnInit(): void {
    this.popularCar();
    this.locationData();
  }
popularCar(){
  debugger;
  this.mService.getAllCars().subscribe((res:any)=>{
    this.pCars = res.data;
    console.log(res.data)
  })
}
locationData(){
  this.mService.getLocation().subscribe((res:any)=>{
    this.locations = res.data;
  })
}
}
