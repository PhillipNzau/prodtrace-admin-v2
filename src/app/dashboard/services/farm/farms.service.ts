import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Injectable} from "@angular/core";
import {FarmInterface} from "../../types/farmInterface";

@Injectable({
  providedIn: 'root'
})
export class FarmsService extends EntityCollectionServiceBase<FarmInterface> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Farms', serviceElementFactory)
  }

}
