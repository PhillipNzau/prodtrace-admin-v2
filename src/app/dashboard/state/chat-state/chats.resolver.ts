import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {ChatEntityService} from "../../services/chat/chat-entity.service";
import {first, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatsResolver implements Resolve<boolean> {
  constructor(private store: Store, private chatService: ChatEntityService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.chatService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.chatService.getAll();
        }
      }),
      first()
    )
  }
}
