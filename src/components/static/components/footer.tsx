import { IFooter, MessageArea, Popup } from "@/components/index";
// import useShowAsPopup from "@/hooks/useShowAsPopup";
// import { useAppSelector } from "@/redux";
import React from "react";
import styles from "../style/footer.module.scss"

export function Footer(props: IFooter) {
    // const { popups } = useAppSelector(state => state.popupReducer);

    const { popups } = props;

    return <div className={styles.footer}>
        <>
            copyright
            {popups?.map(popup => <Popup key={popup.dateTimeId} {...popup} />)}
            {<MessageArea />}
        </>
    </div>
}