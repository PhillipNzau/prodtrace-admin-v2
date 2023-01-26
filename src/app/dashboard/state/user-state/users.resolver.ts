import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {first, Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {UsersService} from "../../services/user/users.service";

@Injectable({
  providedIn: 'root'
})


export class UsersResolver implements Resolve<any>{
  constructor(private store: Store, private userService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    /*
    // First method of checking the resolver
    return this.farmService.loaded$.pipe(
      mergeMap(loaded => {
        if (loaded) {
          return of(true);
        }
        return this.farmService.getAll().pipe(map((farms) => {
          console.log('resolver', farms)
          return !!farms;
        }))
      }),
      first(),
    );
    */
    return this.userService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.userService.getAll();
        }
      }),
      first()
    )
  }
}
