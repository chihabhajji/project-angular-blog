import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../_shared";
import {Post, User} from "../../../_models";
import {PostsService} from "../../../_shared/posts.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  postsByUser: Post[]=[];
  currentUserFollows: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UserService, private postsService: PostsService) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    if(userId == Number(sessionStorage.getItem('id'))){
      this.router.navigateByUrl('/users/profile/update/'+userId);
    }
    this.usersService.getById(userId).subscribe(value => {
      this.user = value;
      this.postsService.findAll().subscribe(value1 => {
        for (let post of value1){
          if(post.createdBy === userId){
            this.postsByUser.push(post);
          }
        }
      });
    });
  }

  deleteItem($event: Post) {
    this.postsService.delete($event.id).subscribe(value => {
      console.log(value + 'DELETED!');
    });
    this.postsByUser.splice(this.postsByUser.indexOf($event, 0), 1);
  }
}
