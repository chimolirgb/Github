import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Repository } from '../classes/repository';
import { GithubService } from '../services/github-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  users: User[] = [];

  repos: Repository[] = [];

  view: boolean = false;



  constructor(private service: GithubService) { }

  search(term: string) {
    this.service.searchUsers(term).then(
      () => {
        this.users = this.service.usersFound;
      },
      (error) => {
        console.log(error);
      }
    );
    this.service.searchRepos(term).then(
      () => {
        this.repos = this.service.reposFound;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.search("Lucia")
  }

}
