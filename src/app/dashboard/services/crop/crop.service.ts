import {Injectable} from "@angular/core";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {CropInterface} from "../../types/cropInterface";

@Injectable({
  providedIn: 'root'
})
export class CropService extends EntityCollectionServiceBase<CropInterface> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Crop', serviceElementFactory)
  }
}
