import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', []],
      senha: ['', []]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.msg = 'Login realizado com sucesso!';
      this.type = 'error';
      this.authService.login(this.loginForm).subscribe(
        data => {
          console.log(data)
        }
      )
      console.log(this.loginForm.value);
    }
  }
}
