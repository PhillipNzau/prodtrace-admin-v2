import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {first, Observable, tap} from "rxjs";
import {PlantCycleService} from "../../services/plantCycle/plant-cycle.service";

@Injectable({
  providedIn: 'root'
})


export class CropCycleResolver implements Resolve<any>{
  constructor(private store: Store,
              private cropCycleService: PlantCycleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.cropCycleService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.cropCycleService.getAll();
        }
      }),
      first()
    )
  }
}
