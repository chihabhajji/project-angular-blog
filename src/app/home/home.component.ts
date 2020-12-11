import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {Post, User} from '../_models';
import {AuthenticationService, UserService} from '../_shared';
import {PostsService} from "../_shared/posts.service";

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.scss'] })
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  postsByFollowees: Post[] = [];
  constructor(
    private authenticationService: AuthenticationService, private us: UserService, private ps: PostsService
    ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.us.getById(this.currentUser.id).subscribe(user => {
      this.ps.findAll().subscribe(posts => {
        for(let post of posts){
          if(user.follows.includes(post.createdBy)){
            this.postsByFollowees.push(post);
          }
        }
      })
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
