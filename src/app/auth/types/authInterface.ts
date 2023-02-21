import {UserModelInterface} from "./userModel";
import {CurrentUserInterface} from "../../shared/types/currentUserInterface";

export interface AuthInterface {
  isSubmitting: boolean,
  currentUser: UserModelInterface | null,
  loggedInUser: CurrentUserInterface |  null,
  validationErrors: string,
  isLoggedIn: boolean | null
}
