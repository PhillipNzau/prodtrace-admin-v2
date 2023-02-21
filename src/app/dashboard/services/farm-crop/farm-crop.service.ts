import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Injectable} from "@angular/core";
import {FarmCropInterface} from "../../types/cropInterface";

@Injectable({
  providedIn: 'root'
})
export class FarmCropService extends EntityCollectionServiceBase<FarmCropInterface> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('FarmCrop', serviceElementFactory)
  }
}
