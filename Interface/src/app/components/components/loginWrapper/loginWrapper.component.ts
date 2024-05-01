import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommonComponent } from '../common/common.component';
import { FormBuilder } from '@angular/forms';
import { animate, animation, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'loginwrapper',
  templateUrl: './loginWrapper.component.html',
  styleUrls: ['./loginWrapper.component.css']
})
export class LoginWrapperComponent extends CommonComponent {
  usernameFormControl = new FormControl('');
  passwordFormControl = new FormControl('');

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  loginSubmitted(data: any) {
    this.authenticationService.login(data.email, data.password);
  }
}
