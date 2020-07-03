import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts/posts.service';
import { AppError } from '../errors/app-error';
import { NotFoundError } from '../errors/not-found';
import { BadRequestError } from '../errors/bad-request';

@Component({
  selector: 'singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css'],
})
export class SinglepostComponent implements OnInit {
  postInfo: Object = null;
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe((params) => {
      id = params.get('id');
    });
    this.postService.getSinglePost(id).subscribe(
      (post) => {
        this.postInfo = post;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          window.alert('This post does not exist.');
        } else if (error instanceof BadRequestError) {
          window.alert('Invalid post request.');
        } else {
          throw error;
        }
      }
    );
  }
}
