import {Injectable} from "@angular/core";
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";

@Injectable({
  providedIn: 'root'
})
export class ChatEntityService extends EntityCollectionServiceBase<any> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Chat', serviceElementFactory)
  }
}
