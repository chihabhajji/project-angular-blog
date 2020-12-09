import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './_components/user/login';
import { RegisterComponent } from './_components/user/register';

import {PostsListComponent} from "./_components/post/posts-list/posts-list.component";

import { AuthGuard } from './_helpers';
import {PostDetailsComponent} from "./_components/post/post-details/post-details.component";
import {CreatePostComponent} from "./_components/post/create-post/create-post.component";
import {EditComponent} from "./_components/post/edit/edit.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'posts', component: PostsListComponent },
    { path: 'posts/new', component: CreatePostComponent },
    { path: 'posts/:id', component: PostDetailsComponent },
    { path: 'posts/edit/:id', component: EditComponent },

    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
