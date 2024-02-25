import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { LoginFormComponent } from "../../components/loginForm/loginForm.component";

@Component({
    selector: "login-page",
    templateUrl: "./login.component.html",
    imports: [RouterOutlet, LoginFormComponent],
    standalone: true
})
export class LoginPageComponent {
    title = "Login"
}