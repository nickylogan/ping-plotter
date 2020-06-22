import { Message } from '../definitions/message';

interface EventPublisher {
  publish(event: string, message: Message): Promise<void>;
}

export default EventPublisher;
