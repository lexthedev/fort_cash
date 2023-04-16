export interface IMessage {
    header: string;
    text: string;
    type: "info" | 'error';
    timeout?: number;
    dateTimeId?: string;
}