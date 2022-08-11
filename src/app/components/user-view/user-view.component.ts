import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser : User | any;
  constructor(
    private userServices: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
      this.activateRoute.params.subscribe(async(params:any) => {
        let id:number = parseInt(params.iduser)
        let response = await this.userServices.getById(id);
        this.myUser = response;
      })    
  }

  deleteUser(pId : number | undefined){
    
    if(pId !== undefined){
      
      this.userServices.delete(pId)
        .then( response => {
          console.log(response)
          if(response !== null){
            alert('Usuario borrado correctamente');
            this.router.navigate(['/home']);
          }
        })

        .catch( err => console.log(err))
      
    }
  }


}
