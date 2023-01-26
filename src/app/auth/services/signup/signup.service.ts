import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SignupService extends EntityCollectionServiceBase<any> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Auth', serviceElementFactory);
  }
}
