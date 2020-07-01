import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found';
import { BadRequestError } from '../errors/bad-request';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  allPosts: any;
  selected = {
    active: false,
    value: null,
  };
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.allPosts = posts;
        console.log(posts);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          window.alert('Post not found.');
        } else if (error instanceof BadRequestError) {
          window.alert('Bad request made for posts.');
        } else {
          throw error;
        }
      }
    );
  }

  public onClick(index) {
    this.selected = {
      active: !this.selected.active,
      value: index,
    };
  }
}
