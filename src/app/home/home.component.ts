import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Post, User} from '../_models';
import {  AuthenticationService } from '../_shared';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  postsByFollowees: Post[] = [];
  constructor(
    private authenticationService: AuthenticationService
    ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
