import { Component, OnInit } from '@angular/core';
import {TokenService} from "../service/token.service";
import {Router} from "@angular/router";
import {PostService} from "../service/post.service";
import {Posts} from "../models/posts";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit {
  isLoggedIn = false;
  posts: Posts[] = [];
  pageSize = 20;
  currentPage = 1;
  isAddingPost = false;
  editedPostId  ='';
  editedPostMessage = '';
  editedPostMedia = '';

  constructor(public tokenStorageService: TokenService, private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
    }
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error getting posts:', error);
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.pageSize);
  }

  get pagedPosts(): Posts[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.posts.slice(startIndex, endIndex);
  }

  editPost(post: Posts): void {
    this.editedPostId = post.id;
    this.editedPostMessage = post.message;
    this.editedPostMedia = post.media_url;
  }

  updatePost(postId: string, message: string, media_url: string): void {
    this.postService.updatePost(postId, message, media_url).subscribe(() => {
      console.log('Пост успешно обновлен');
      this.cancelEdit();
      this.reloadPage();
    }, error => {
      console.error('Ошибка при обновлении поста:', error);
    });
  }

  cancelEdit(): void {
    this.editedPostId = '';
    this.editedPostMessage = '';
    this.editedPostMedia = '';
  }

  addPost(): void {
    this.isAddingPost = true;
    this.router.navigate(['/add-post']);
  }

  logout() {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }


  deletePost(post: Posts): void {
    if (post.login === this.tokenStorageService.getUser().user[0].login) {
      this.postService.deletePost(post.id).subscribe(
        () => {
          this.getPosts();
          console.log('Успешно');

        },
        (error) => {
          console.error('Ошибка при удалении:', error);
        }
      );
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}

