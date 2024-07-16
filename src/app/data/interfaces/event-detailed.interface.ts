import { EventInterface } from "./event.interface";
import { UserInterface } from "./user.interface";

export interface Participant {
    id: string;
    username: string;
}

export interface EventDetailedInterface extends EventInterface {
    participants: Participant[];
}