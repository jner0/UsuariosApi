import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() myUser!: User;
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  deleteUser(pId : number | undefined){
    
    let result = confirm("Deseas borrar el usuario " + this.myUser.first_name + "?");
    if(result){
      if(pId !== undefined){
      
        this.usersService.delete(pId)
          .then( response => {
            console.log(response)
            if(response.id){
              Swal.fire(
                'Usuario Eliminado',
                'Has eliminado el usuario de forma correcta',
                'success'
              )
            }else{
              alert(response.console.error);
            }
          })
  
          .catch( err => console.log(err))
        
      }

    }
    
  }
}
