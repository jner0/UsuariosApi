import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
    
    let result = confirm("Deseas borrar el usuario " + this.myUser.first_name + "?");
    if(result){
      if(pId !== undefined){
      
        this.userServices.delete(pId)
          .then( response => {
            console.log(response)
            if(response.id){
              Swal.fire(
                'Usuario Eliminado',
                'Has eliminado el usuario de forma correcta',
                'success'
              )
              this.router.navigate(['/home']);
            }else{
              alert(response.console.error);
            }
          })
  
          .catch( err => console.log(err))
        
      }

    }
    
  }


}
