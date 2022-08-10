import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formModel: FormGroup;
  type: string = 'Ingresar';
  title: string = 'Ingresar Nuevo Usuario';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.formModel = new FormGroup({
      first_name: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) //expresiones regulares Regex
      ]),
      username: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/) //expresiones regulares
      ])
    }, [])
  }

  ngOnInit(): void {
    //tenemos que diferenciar entre una actualizacion y un registro nuevo. Lo hacemos mediante la ruta
    this.activatedRoute.params.subscribe( async (params: any) => {
      let id: number = parseInt(params.iduser);
      console.log(params);
      //hacer una peticion para traerme los datos con los que quiero llenar el formulario
      if(id){
        this.type = 'Actualizar';
        this.title = 'Actualizar Usuario'
        const response = await this.usersService.getById(id)
        const user: User = response
        this.formModel = new FormGroup({
          first_name: new FormControl(user?.first_name,[
            Validators.required,
            Validators.minLength(3)
          ]),
          last_name: new FormControl(user?.last_name,[
            Validators.required
          ]),
          email: new FormControl(user?.email,[
            Validators.required,
            Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) //expresiones regulares Regex
          ]),
          username: new FormControl(user?.username,[
            Validators.required
          ]),
          password: new FormControl(user?.password, [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)
          ]),
          id: new FormControl(user?.id, [])
        }, [])
      }

    })
  }

  async getDataForm() : Promise<void>{
    let newUser = this.formModel.value;
    // Actualizar
    if(newUser.id){
      let response = await this.usersService.update(newUser);
        alert('Usuario Actualizado')
        console.log(response);
        this.router.navigate(['/home']);
    }else{
      //crear Usuario
      let response = await this.usersService.create(newUser);
      if(response.id){
        alert("Usuario Ingresado Correctamente");
        this.router.navigate(['/home']);
      } 
    }
     
  }

  checkControl(pControlName: string, pError: string) : boolean{
    if(this.formModel.get(pControlName)?.hasError(pError) && this.formModel.get(pControlName)?.touched){
      return true
    }else{
      return false
    }
  }

}
