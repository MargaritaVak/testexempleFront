import { Component, OnInit } from '@angular/core';
import {Posts} from "../models/posts";
import {PostService} from "../service/post.service";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent{
  userId!: string;
  message!: string;
  mediaUrl!: string;
  isPostCreated = false;
  errorMessage = '';

  constructor(private postService: PostService, private tokenService: TokenService) { }

  onSubmit(): void {
    this.userId = this.tokenService.getUserId();
    this.postService.createPost(this.userId, this.message, this.mediaUrl).subscribe(
      () => {
        this.isPostCreated = true;
        console.log('Пост создан успешно!');
      },
      (error) => {
        this.errorMessage = error.message;
        console.error('Ошибка при создании поста:', error);
      }
    );
  }
}
