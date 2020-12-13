import {Component, OnInit, ViewChild} from '@angular/core';
import { User} from "../../../model";
import {merge, Observable, Subject, Subscription} from "rxjs";
import {Post} from "../../../model";
import {PostsService} from "../../../shared/posts.service";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {AuthenticationService, UserService} from "../../../shared";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  categories: string[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  posts: Post[] = [];
  postTitleSearchField: string = '';
  categorySearchField: string = '';
  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private postsService: PostsService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? this.categories
            : this.categories.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
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
      for (let post of this.posts){
        for(let cat of post.categories){
          if(this.categories.indexOf(cat) === -1) {
            this.categories.push(cat);
          }
        }
      }
    });
  }

  deleteItem(post: Post): void{
    this.postsService.delete(post.id).subscribe(value => {
      console.log(value + 'DELETED!');
    });
    this.posts.splice(this.posts.indexOf(post, 0), 1);
  }

  resetFields() {
    this.categorySearchField = '';
    this.postTitleSearchField = '';
  }
}
