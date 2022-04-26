import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from '../../models/driver-interface';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public driver: Driver;
  public name;

  constructor(
    private router: Router,
    private shareService: SharedService
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name').split(' ')[0];
  }

  public getDriver(){

    let id = localStorage.getItem('driver_id');
    this.shareService.getDriver(id)
      .subscribe(driver => {
        this.driver = driver;
      });
  }

  public out(){
    localStorage.removeItem('driver_id');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['home']);
  }

}
