export interface IPopup {
    title: string;
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
    dateTimeId?: string;
}