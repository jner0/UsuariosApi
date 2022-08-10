import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  arrUsers: User[] = [];
  currentPage: number = 0;
  total_pages: number = 0;
  constructor(private usersService: UsersService) { }

  async ngOnInit(): Promise<void> {
    let response = await this.usersService.getAll();
    this.currentPage = response.page;
    this.arrUsers = response.data;

  }

  async goToPage(pPage:number) : Promise<void>{
    try{
    let response = await this.usersService.getAll(pPage)
    this.currentPage = response.page;
    this.arrUsers = response.data;
    this.total_pages = response.total_pages;
    }catch(err){
      alert(err);
    }
  }
}
