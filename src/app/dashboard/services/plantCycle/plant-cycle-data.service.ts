import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator, QueryParams} from "@ngrx/data";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlantCycleDataService extends DefaultDataService<any> {
  ///// PLANT CYCLE URL
  createPlantCycleUrl = environment.createPlantCycle;
  listPlantCycleUrl = environment.listPlantCycle;

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('PlantCycle', http, httpUrlGenerator);
  }

  override getAll(): Observable<any[]> {
    return this.http.get(this.listPlantCycleUrl).pipe(
      map((plantCycle: any) => {
        return plantCycle.results;
      })
    )
  };

  override add(plantCycle: any): Observable<any> {
    return this.http.post(this.createPlantCycleUrl, plantCycle).pipe(
      map((plantCycle) => {
        console.log('plant cycle',
          plantCycle)
        return plantCycle
      })
    )
  };

  override getWithQuery(queryParams: QueryParams | string): Observable<any[]> {
    return this.http.get(`http://192.168.1.24:8000/api/v1/plant-cycle/qr-code?id=${queryParams}`).pipe(
      map((cropCycle: any)=> {
        console.log('Crop Cycle', cropCycle)
        return cropCycle
      })
    )
  }
}
