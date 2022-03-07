export interface IncomingMessage<T> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: unknown;
  value: T;
  headers: Record<string, unknown>;
}
