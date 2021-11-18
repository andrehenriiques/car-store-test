import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.loginForm.valid){
      if(this.getItensValids()){
        this.toastr.success('Bem-vindo(a)')
        this.router.navigate(['/inicio'])
      }else{
        this.toastr.error('Credenciais inválidas')
        this.loginForm.reset()
      }
    }else{
      this.toastr.error('Campos inválidos')
    }
  }


  getItensValids(): boolean{
    if(this.loginForm?.get('email')?.value === 'suporte@carstore.com' && this.loginForm?.get('password')?.value === '123456'){
      return true
    }else{
      return false
    }
  }

}
