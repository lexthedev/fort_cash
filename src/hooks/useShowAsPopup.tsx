import { IPopup } from "@/components";
import { useAppDispatch } from "@/redux";
import { popupSlice } from "@/redux/reducers/popupReducer";

function useShowAsPopup() {
    const dispatch = useAppDispatch();

    return (props: IPopup) => {
        const { addPopup, removePopup } = popupSlice.actions;
        const onClose = props.onClose; // TODO does it work?
        props.onClose = () => { removePopup; onClose };
        dispatch(addPopup(props));
    }
}

export default useShowAsPopup;