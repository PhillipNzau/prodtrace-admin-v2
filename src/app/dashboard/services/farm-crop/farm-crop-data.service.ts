import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Update} from "@ngrx/entity";
import {map, Observable} from "rxjs";

import {FarmCropInterface} from "../../types/cropInterface";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FarmCropDataService extends DefaultDataService<FarmCropInterface> {
  ////// FARM CROP URL
  listFarmCropsUrl = environment.listFarmCrop;
  createFarmCropUrl = environment.createFarmCrop;
  getFarmCropUrl = environment.getFarmCrop;
  updateFarmCropUrl = environment.updateFarmCrop;

  constructor(http: HttpClient, httpUrlGenerator:HttpUrlGenerator) {
    super('FarmCrop', http, httpUrlGenerator);
  }

  override getAll(): Observable<any> {
    return this.http.get<any>(this.listFarmCropsUrl).pipe(
      map((farmCrop: any) => {
        return farmCrop.results
      }))
  }

  override getById(id: number | string): Observable<FarmCropInterface> {
    return this.http.get<any>(this.listFarmCropsUrl + id).pipe(
      map((farmCrop: any) => {
        return farmCrop.results
      }))
  }

  override add(cropData: FarmCropInterface): Observable<FarmCropInterface> {
    return this.http.post<FarmCropInterface>(this.createFarmCropUrl, cropData).pipe(
      map((farmCrop:FarmCropInterface) => {
        return farmCrop
      })
    )
  }

  override update(farmCrop: Update<any>): Observable<any> {
    return this.http.patch<any>(this.updateFarmCropUrl + farmCrop.id, farmCrop.changes).pipe(
      map((crop:FarmCropInterface) => {
        return crop
      })
    )
  }
}
