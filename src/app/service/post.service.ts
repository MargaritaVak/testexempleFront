import { Injectable } from '@angular/core';
import {Posts} from "../models/posts";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private createUrl = `${environment.URL_server}/post-create`; // Замените на ваш базовый URL сервера
  private getPostUrl=`${environment.URL_server}/posts`
  private postUrl=`${environment.URL_server}/post`

  constructor(private http: HttpClient) { }

  createPost(userId: string, message: string, mediaUrl: string): Observable<any> {
    const body = {
      userId: userId,
      message: message,
      mediaUrl: mediaUrl
    };
    return this.http.post<any>(`${this.createUrl}`, body, httpOptions);
  }

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.getPostUrl);
  }

  deletePost(postId: string): Observable<any> {
    const url = `${this.postUrl}/${postId}`;
    return this.http.delete<any>(url);
  }


  updatePost(postId: string, message: string, mediaUrl: string): Observable<any> {
    const url = `${this.postUrl}/${postId}`;
    const body = {
      message: message,
      mediaUrl: mediaUrl
    };
    return this.http.put(url, body);
  }

}
