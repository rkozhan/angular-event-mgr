import { EventInterface } from "./event.interface";
import { UserInterface } from "./user.interface";

export interface EventDetailedInterface extends EventInterface {
    participants: UserInterface[];
}