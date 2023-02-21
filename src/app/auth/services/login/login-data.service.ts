import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginUserInterface, RefreshTokenInterface, UserModelInterface} from "../../types/userModel";
import {LocalService} from "../../../shared/service/local.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginDataService extends DefaultDataService<any> {
  loginUrl = environment.loginUser;
  signUpUrl = environment.registerUser;
  logOutUrl = environment.logOutUser;
  refreshTokenUrl = environment.tokenRefresh;
  updateUserUrl = environment.updateUser

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private localStore: LocalService,
    private route: Router) {
    super('FarmCrop', http, httpUrlGenerator);
  }

  proceedLogin(userData: LoginUserInterface): Observable<UserModelInterface> {
    return this.http.post<UserModelInterface>(this.loginUrl, userData).pipe(
      map((loginRes: UserModelInterface) => {
        this.localStore.saveData('ptt', loginRes.token.access);
        this.localStore.saveData('ptr', loginRes.token.refresh);
        this.localStore.saveData('ptl', loginRes.token.lifetime);
        this.localStore.saveData('ptex', loginRes.token.expiry_time);
        this.localStore.saveData('ptlstat', 'true')

        // Navigate if success
        this.route.navigate(['/']).then(() => {})
        return loginRes
      })
    )
  }

  refreshToken(refreshToken:string): Observable<RefreshTokenInterface> {
    return this.http.post<RefreshTokenInterface>(this.refreshTokenUrl, refreshToken).pipe(
      map((refreshRes: RefreshTokenInterface) => {
        this.localStore.saveData('ptt', refreshRes.access);
        this.localStore.saveData('ptr', refreshRes.refresh);
        return refreshRes
      })
    )
  }

}
