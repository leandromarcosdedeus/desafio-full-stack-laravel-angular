import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', []],
      senha: ['', []]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.msg = 'Login realizado com sucesso!';
      this.type = 'error';
      console.log(this.loginForm.value);
    }
  }
}
