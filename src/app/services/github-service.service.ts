import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { User } from '../classes/user';
import { Repository } from '../classes/repository';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  usersFound: User[] = [];

  reposFound: Repository[] = [];

  searchUsers(term: string) {
   
    let endpoint = `https://api.github.com/search/users?access_=${environment.apiKey}&q=${term}&per_page=7`;
    //  let endpoint = "https://api.github.com/search/users?access_token="+environment.apiKey + "&q=" + term;

    let promise = new Promise<void>((resolve, reject) => {
      this.client
        .get(endpoint)
        .toPromise()
        .then(
          (results: any) => {
            this.usersFound = [];
            console.log('results');
            for (let i = 0; i < results['items'].length; i++) {
              let name = results['items'][i]['login'];
              let imagePath = results['items'][i]['avatar_url'];
              let user = new User(name, imagePath);
              this.usersFound.push(user);
            }
            resolve();
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
    });
    return promise;
  }

  searchRepos(term: string) {
    let endpoint = `https://api.github.com/search/repositories?access_=${environment.apiKey}&q=${term}&per_page=5`
    // let endpoint = "https://api.github.com/search/users?access_token="+environment.apiKey + "&q=" + term;
    let promise = new Promise<void>((resolve, reject) => {
      this.client
        .get(endpoint)
        .toPromise()
        .then(
          (results: any) => {
            this.reposFound = [];
            for (let i = 0; i < results['items'].length; i++) {
              let name = results['items'][i]['full_name'];
              let repoUrl = results['items'][i]['html_url'];
              let userName = results['items'][i]['owner']['login'];
              let userImage = results['items'][i]['owner']['avatar_url'];
              let repo = new Repository(name, repoUrl, userName, userImage);
              this.reposFound.push(repo);
            }
            resolve();
          },
          (error) => {
            console.log(error);
            reject();
          }
        );
    });
    return promise;
  }



  constructor(private client: HttpClient) { }
}
