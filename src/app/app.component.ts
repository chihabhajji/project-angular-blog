import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService, UserService} from './_shared';
import {User} from './_models';
import {ToastrService} from "ngx-toastr";
import {AlertComponent} from "./_components";
import {NotificationType} from "./_models/NotificationMessage";

@Component({ 
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currentUser: User;
  profilePicture: string;
  fullName: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
    if(this.currentUser != null)
    this.userService.getById(this.currentUser.id).subscribe(value => {
      this.profilePicture = value.profilePicture;
      this.fullName = value.firstName + ' ' + value.lastName;
    })

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

  }
}
