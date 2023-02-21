import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

import {environment} from "../../../../environments/environment";
import {Update} from "@ngrx/entity";
import {ListUsersInterface, UserInterface} from "../../../auth/types/userModel";
import {FarmInterface} from "../../types/farmInterface";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService extends DefaultDataService<ListUsersInterface> {
  //// Users Url
  listUsersUrl = environment.listUsers;
  createUserUrl = environment.registerUser;
  updateUserUrl = environment.updateUser;


  constructor(http: HttpClient, httpUrlGenerator:HttpUrlGenerator) {
    super('Users', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(this.listUsersUrl).pipe(
      map((users: any) => {
        return users.results
      } ))
  }

  // override add(userData: UserInterface): Observable<UserInterface> {
  //   return this.http.post<UserInterface>(this.createUserUrl, userData).pipe(
  //     map((user:UserInterface) => user)
  //   )
  // }

  override update(farm: Update<any>): Observable<any> {
    return this.http.patch<any>(this.updateUserUrl + farm.id, farm.changes).pipe(
      map((farm:FarmInterface) => {
        return farm
      })
    )
  }
}
