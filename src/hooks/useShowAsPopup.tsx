// import { IPopup } from "@/components";
// import { useAppDispatch } from "@/redux";
// import { popupSlice } from "@/redux/reducers/popupReducer";

// function useShowAsPopup() {
//     const dispatch = useAppDispatch();

//     return (props: IPopup) => {
//         const { addPopup, removePopup } = popupSlice.actions;
//         const onClose = props.onClose; // TODO does it work?
//         props.onClose = () => { removePopup; onClose };
//         dispatch(addPopup(props));
//     }
// }

import { IPopup } from "@/components";
import { useEffect, useState } from "react";

function useShowAsPopup(popup?: IPopup) {
    const [popups, setPopups] = useState<IPopup[]>([])

    useEffect(() => { !!popup && setPopups([...popups, popup]) }, [popup])
    // useEffect(() => { !!popup && setPopups([...popups, popup]) }, [])

    function addPopup(props: IPopup) {
        const onClose = props.onClose; // TODO does it work?
        props.onClose = () => { console.log('hi'); removePopUp(props.dateTimeId as string); onClose };
        props.dateTimeId = String(Date.now);
        setPopups([...popups, props]);
        console.log('popups:', popups);
    }

    function removePopUp(id: string) {
        console.log(id);

        setPopups(popups.filter(pop => pop.dateTimeId !== id));
    }

    return { popups, addPopup, removePopUp };
}

export default useShowAsPopup;