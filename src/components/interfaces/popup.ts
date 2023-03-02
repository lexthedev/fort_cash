export interface IPopup {
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}