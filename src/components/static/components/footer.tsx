import { MessageArea, Popup } from "@/components/index";
import { useAppSelector } from "@/redux";
import React from "react";
import styles from "../style/footer.module.scss"

export function Footer() {
    const { popup } = useAppSelector(state => state.popupReducer);

    return <div className={styles.footer}>
        <>
            copyright
            {!!popup && <Popup {...popup} />}
            {<MessageArea />}
        </>
    </div>
}