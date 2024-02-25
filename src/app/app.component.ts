import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AxiosInstance } from '../shared/axiosInstance';
import { AuthService } from './services/auth.service';
import { AxiosError, AxiosResponse } from 'axios';
import { getTokens } from '../shared/JwtTokens';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  title = 'Angular-auth-app';
  userInfo: UserInfo | null = null;

  instance = new AxiosInstance();

  router = new Router()

  constructor(private userInfoService: AuthService) {
    if (getTokens()) {
      this.instance
      .get('/api/user/self')
      .then((resp: AxiosResponse) => {
        let status_text; 
        try {
          status_text = JSON.parse(resp.data as string).status
        }
         finally {
        }
        if ((resp.status === 401 && status_text === "Expired") || resp.status === 422) {
          this.instance.refreshTokens()
          return
        }

        const data = JSON.parse(resp.data)

        this.userInfo = data.info as UserInfo;
        userInfoService.setUserInfo(this.userInfo);
        if (this.router.url.startsWith('/login')) {
          this.router.navigate(['/'], {replaceUrl: true})
        }
      })
      .catch((err: AxiosError<any>) => {
        if (this.router.url.startsWith('/')) {
          this.router.navigate(['/login'], {replaceUrl: true})
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
        }
      });
    }
  }

  ngOnInit() {
    this.userInfoService.currentUser.subscribe((info) => this.userInfo = info);
  }

  toggleColorMode() {
    const html = document.getElementsByTagName('html')[0];
    const theme = html.getAttribute('data-bs-theme');
    if (theme === 'dark') {
      html.setAttribute('data-bs-theme', 'light');
      return;
    }
    html.setAttribute('data-bs-theme', 'dark');
  }

  logOut () {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    window.location.reload()
  }
}
