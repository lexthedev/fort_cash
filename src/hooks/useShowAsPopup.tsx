import { IPopup } from "@/components";
import { useAppDispatch } from "@/redux";
import { popupSlice } from "@/redux/reducers/popupReducer";

function useShowAsPopup() {
    const dispatch = useAppDispatch();

    return (props: IPopup) => {
        // const popup = props;
        const { addPopup, removePopup } = popupSlice.actions;
        const onClose = props.onClose; // TODO does it work?
        props.onClose = () => { removePopup; onClose };
        dispatch(addPopup(props));
        // setState(true)
    }
}

export default useShowAsPopup;