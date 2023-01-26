import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {first, Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {FarmsService} from "../../services/farm/farms.service";

@Injectable({
  providedIn: 'root'
})

export class FarmsResolver implements Resolve<boolean> {
  constructor(private store: Store, private farmService: FarmsService) {}

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
    return this.farmService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.farmService.getAll();
        }
      }),
      first()
    )
  }
}
