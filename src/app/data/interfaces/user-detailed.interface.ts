import { UserInterface } from './user.interface';
import { EventInterface } from './event.interface';
import { RegistrationInterface } from './registration.interface';

export interface UserDetailedInterface extends UserInterface {
    userRegistrations: RegistrationInterface[];
    joinedEvents: EventInterface[];
    createdEvents: EventInterface[];
}