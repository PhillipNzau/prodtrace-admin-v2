import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {first, Observable, tap} from "rxjs";
import {FarmCropService} from "../../services/farm-crop/farm-crop.service";

@Injectable({
  providedIn: 'root'
})


export class FarmCropResolver implements Resolve<any>{
  constructor(private store: Store, private farmCropService: FarmCropService) {}

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
    return this.farmCropService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.farmCropService.getAll();
        }
      }),
      first()
    )
  }
}
