import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginUserInterface, UserModelInterface} from "../../types/userModel";

@Injectable({
  providedIn: 'root'
})
export class SignupDataService extends DefaultDataService<any> {
  loginUrl = environment.loginUser;
  signUpUrl = environment.registerUser;
  logOutUrl = environment.logOutUser;
  refreshTokenUrl = environment.tokenRefresh;
  updateUserUrl = environment.updateUser

  constructor(http: HttpClient, httpUrlGenerator:HttpUrlGenerator) {
    super('FarmCrop', http, httpUrlGenerator);
  }

  override add(userData: LoginUserInterface): Observable<UserModelInterface> {
    return this.http.post<UserModelInterface>(this.signUpUrl, userData).pipe(
      map((response: UserModelInterface) => {
        return response
      })
    )
  }

}
