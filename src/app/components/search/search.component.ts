import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterServicesService } from '../../services/master-services.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  mServices = inject(MasterServicesService)
  locations:any[] = [];
  locationId:string = '';
  fromLocation:String ='';
  toLocation:String ='';
  availableCars:any[] = [];


  constructor(private activateRoute:ActivatedRoute, private router:Router){
    this.activateRoute.params.subscribe(res=>{
      this.locationId = res['locationId']
      this.fromLocation = this.locationId;
      this.toLocation = this.locationId;
    })
    this.getCarsFromLocation();
  }
  ngOnInit(): void {
    this.locationData();
  }

  locationData(){
    this.mServices.getLocation().subscribe((res:any)=>{
      this.locations = res.data;
    })
  }
  getCarsFromLocation(){
    this.mServices.getAllCarsByLocation(this.locationId).subscribe((res:any)=>{
      this.availableCars = res.data;
    })
  }
  onChangeLocation(){
    this.mServices.getAllCarsByLocation(this.fromLocation).subscribe((res:any)=>{
      this.availableCars = res.data;
    })
  }
  makeBooking(carId:any){
    this.router.navigate(['/booking',this.fromLocation,carId])
  }
}
