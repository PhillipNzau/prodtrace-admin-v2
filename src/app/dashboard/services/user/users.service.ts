import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Injectable} from "@angular/core";
import {FarmInterface} from "../../types/farmInterface";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends EntityCollectionServiceBase<FarmInterface> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Users', serviceElementFactory)
  }

}
