import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'index-page',
  templateUrl: './index.component.html',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
})
export class IndexPageComponent {
  title = 'Dashboard';
  userInfo: UserInfo | null = null;
  router = new Router();

  constructor(private userInfoService: AuthService) {
    userInfoService.currentUser.subscribe(info => this.userInfo = info)
    if (!this.userInfo) {
        this.router.navigateByUrl('/login', {replaceUrl: true})
        return
    }
  }
}
