import {Injectable} from "@angular/core";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";

@Injectable({
  providedIn: 'root'
})
export class PlantCycleService extends EntityCollectionServiceBase<any> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('PlantCycle', serviceElementFactory);
  }
}
