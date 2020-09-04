import {injectable} from "inversify";
import {Subject} from "rxjs";

@injectable()
export class MessageService {

    messages = new Subject<string>();

    add(message: string) {
        this.messages.next(message);
    }
}