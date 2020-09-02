import {Container} from "inversify";
import getDecorators from "inversify-inject-decorators";
import {HeroService} from "./hero-service";
import {MessageService} from "./message-service";

export const container = new Container({
    autoBindInjectable: true,
    skipBaseClassChecks: true
})

container.bind(HeroService).toSelf().inSingletonScope()
container.bind(MessageService).toSelf().inSingletonScope()

export const { lazyInject } = getDecorators(container)