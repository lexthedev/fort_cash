export interface IPopUpAction {
    onSubmit?: (e: MouseEvent) => void,
    onCancel?: (e?: MouseEvent) => void;
}