import { Message } from '../definitions/message';

interface WidgetPublisher {
  publishWidgetMessage(id: string, message: Message): Promise<void>;
}

export default WidgetPublisher;
