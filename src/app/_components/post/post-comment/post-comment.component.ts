import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment, User} from "../../../_models";
import {AuthenticationService, UserService} from "../../../_shared";

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment: Comment;
  @Output() deleteEmitter: EventEmitter<Comment> = new EventEmitter<Comment>();
  commenter: User;
  userId: number;
  constructor(private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(value => this.userId = value.id);
    this.userService.getById(this.comment.by).subscribe(value => this.commenter = value);
  }

  deleteComment() {
    this.deleteEmitter.emit(this.comment);
  }
}
