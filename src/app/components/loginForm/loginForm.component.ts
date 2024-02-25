import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { AxiosInstance } from '../../../shared/axiosInstance';
import { setTokens } from '../../../shared/JwtTokens';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './loginForm.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class LoginFormComponent {
  title = 'Authenticate';
  loginForm: FormGroup = new FormGroup({});

  userInfo: UserInfo | null = null;

  instance = new AxiosInstance();

  router = new Router()

  constructor(private fb: FormBuilder, private userInfoService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
    // this.loginForm.valueChanges.subscribe(console.log);
  }

  async handleLogin() {
    const username = this.loginForm.value.username as string;
    const password = this.loginForm.value.password as string;

    const input_data = {
      email: username,
      password: password,
    };

    axios
      .post(
        '/api/user/login',
        { ...input_data },
        {
          baseURL: this.instance.defaults.baseURL,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((resp: any) => {
        if (!resp.data?.access_token) {
          // throw Error('Bad Response!');
        }
        this.userInfo = resp.data.info as UserInfo;
        this.userInfoService.setUserInfo(this.userInfo)
        setTokens({ tokens: resp.data.tokens });
        this.router.navigate(['/'], {replaceUrl: true})
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
