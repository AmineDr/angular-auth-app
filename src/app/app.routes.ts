import { Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index/index.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: "", component: IndexPageComponent },
    { path: "login", component: LoginPageComponent}
];
