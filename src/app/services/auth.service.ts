import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthService {
    private userInfoSource = new BehaviorSubject<UserInfo | null>(null)
    currentUser = this.userInfoSource.asObservable()

    constructor () {}

    setUserInfo (userInfo: UserInfo | null) {
        this.userInfoSource.next(userInfo)
    }
}
