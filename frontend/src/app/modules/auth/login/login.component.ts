import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-login',
  //standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  msg: string | null = null;
  type: 'success' | 'error' | null = null;
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService, private token: TokenService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.handleResponse(data);
      },
      error: (err) => {
        // Aqui você captura o erro retornado pelo backend
        this.msg = 'Dados incorretos. Por favor, revise seus dados\n e tente novamente.';
        this.type = 'error';
      }
    });
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleResponse(data: any){
    this.token.handle(data);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('clinic');
  }
}
