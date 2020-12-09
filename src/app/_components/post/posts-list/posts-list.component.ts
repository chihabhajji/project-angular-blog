import { Component, OnInit } from '@angular/core';
import { User} from "../../../_models";
import {Subscription} from "rxjs";
import {Post} from "../../../_models/post";
import {PostsService} from "../../../_shared/posts.service";
import {first} from "rxjs/operators";
import {AuthenticationService, UserService} from "../../../_shared";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  accounts: Account[] = [];
  posts: Post[] = [];
  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private postsService: PostsService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadPosts();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  private loadPosts() {
    this.postsService.findAll().subscribe((post: Post[]) => {
      this.posts = post;
    });
  }

  deleteItem(post: Post): void{
    this.postsService.delete(post.id).subscribe(value => {
      console.log(value + 'DELETED!');
    });
    this.posts.splice(this.posts.indexOf(post, 0), 1);
  }
}
