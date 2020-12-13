import {Component, Input, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {Post, User} from "../../../model";
import {AlertService, AuthenticationService, UserService} from "../../../shared";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PostsService} from "../../../shared/posts.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Output() removedEventEmitter = new EventEmitter<Post>();
  isLikedByCurrentUser: boolean = false;
  postAuthor: User;
  closeResult = '';
  currentUser: number = Number(sessionStorage.getItem('id'));

  constructor(private userService: UserService, private authService: AuthenticationService,private modalService: NgbModal, private alertService: AlertService, private postsService: PostsService) {

  }

  ngOnInit(): void {
    console.log(this.currentUser);
    this.authService.currentUser.subscribe(value => {
      if(this.post.likedBy.includes(value.id)){
        this.isLikedByCurrentUser = true;
      }
    });
    this.userService.getById(this.post.createdBy).subscribe(value => {
      this.postAuthor = value;
    });
  }
  delete(): void{
    this.alertService.success('Succesfully deleted '+ this.post.title, false);
    return this.removedEventEmitter.emit(this.post);
  }

  doLike(): void {
    if(this.post.likedBy.includes(this.currentUser)){
      const index = this.post.likedBy.indexOf(this.currentUser, 0);
      if (index > -1) {
        this.post.likedBy.splice(index, 1);
      }
    } else {
      this.post.likedBy.push(this.currentUser);
    }
    this.postsService.createOrUpdate(this.post).subscribe(value => this.alertService.success('Succesfully updated'),error => this.alertService.error('Couldnt update'));
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result==='delete'){
        this.delete();
      }
    });
  }

}

