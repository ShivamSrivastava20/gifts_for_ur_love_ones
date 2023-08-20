import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { Authguard } from '../../../../../../../cake-shop/libs/users/src/lib/services/authguard.service';
import { LocalstorageService } from '@bluebits/users'
import { AuthService } from '@bluebits/users'

import { UsersService } from '../../../../../../libs/product/src/lib/service/users.service'

@Component({
  selector: 'bluebits-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  showSignUp:boolean=false;
  guest:any="Guest !!"
  constructor(private router: Router,private localstorage: LocalstorageService , private users:UsersService , private authservice:AuthService) {}
  ngOnInit(): void {
    if(this.localstorage.isValidToken())
    {
      this.guest=this.localstorage.getUserIdFromToken();
      this.users.getUser(this.guest).subscribe((res:any)=>
      {
        this.guest=res?.name;
      })
    }
  }
  click_user()
  {
    this.showSignUp=!this.showSignUp;   
  }
  signup_form()
  {
    if( this.showSignUp) this.router.navigate(['register']);
     this.showSignUp=!this.showSignUp;
  }
  signout()
  {
    this.authservice.logout();
    this.showSignUp=!this.showSignUp;
    alert("Successfully Logout");
   
  }
  myaccount_form()
  {

  }
  myorders_form()
  {

  }
}
