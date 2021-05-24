export class User {

    constructor(
        public userName: string,
        public profileImage: string,
        public noOfRepos: number,
        public noOfFollowers: number,
        public description: string,
        public viewDetails: boolean = false       
      ) {}   

}
