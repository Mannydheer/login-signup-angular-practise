import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    //Create a form.
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
    //Get all Posts.
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
  //get and set for form.
  public get title() {
    return this.form.get('title');
  }
  public get body() {
    return this.form.get('body');
  }
  //submit
  public submit() {
    //update the FE right away.
    let post = this.form.value;
    this.allPosts.splice(0, 0, post);

    this.postService.createPost(post).subscribe(
      (newPost: any) => {
        console.log(newPost);
        post['id'] = newPost.id;
      },
      (error: AppError) => {
        //reverse the post on FE if there is an error.
        this.allPosts.splice(0, 1);
        if (error instanceof BadRequestError) {
          alert('Invalid post information.');
        } else throw error;
      }
    );
  }
}
