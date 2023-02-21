import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {filter, finalize, first, Observable, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {CropService} from "../../services/crop/crop.service";

@Injectable({
  providedIn: 'root'
})


export class CropsResolver implements Resolve<any>{
  constructor(private store: Store, private cropService: CropService) {}

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
    return this.cropService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.cropService.getAll();
        }
      }),
      first()
    )
  }
}
