import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './_components/user/login';
import { RegisterComponent } from './_components/user/register';
import { AlertComponent } from './_components';
import { PostCardComponent} from './_components/post/post-card/post-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsListComponent } from './_components/post/posts-list/posts-list.component';
import { PostDetailsComponent } from './_components/post/post-details/post-details.component';
import { CreatePostComponent } from './_components/post/create-post/create-post.component';
import { PostCommentComponent } from './_components/post/post-comment/post-comment.component';
import { EditComponent } from './_components/post/edit/edit.component';
import { UserProfileComponent } from './_components/user/user-profile/user-profile.component';

import { ToastrModule } from 'ngx-toastr';
import { UserProfileUpdateComponent } from './_components/user/user-profile-update/user-profile-update.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDialogModule,
        NgbModule,
        FormsModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        PostCardComponent,
        PostsListComponent,
        PostDetailsComponent,
        CreatePostComponent,
        PostCommentComponent,
        EditComponent,
        UserProfileComponent,
        UserProfileUpdateComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
