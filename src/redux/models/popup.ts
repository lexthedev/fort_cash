export interface IPopup {
    title: string;
    children: JSX.Element;
    onClose?: () => void;
    dateTimeId?: string;
}