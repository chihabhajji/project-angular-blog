import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
    API_LINK = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.API_LINK + `/users`);
    }

    register(user: User): Observable<any> {
        return this.http.post(this.API_LINK + `/register`, user);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.API_LINK + `/users/${id}`);
    }

    getById(id: number): Observable<User>{
        return this.http.get<User>(this.API_LINK + `/users/${id}`);
    }
}
