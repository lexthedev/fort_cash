import { MessageArea, Popup } from "@/components/index";
import React from "react";
import styles from "../style/footer.module.scss"

export function Footer() {
    return <div className={styles.footer}>
        <>
            copyright
            {<Popup title={"324"} >
                <div>r32</div>
            </Popup>}
            {<MessageArea />}
        </>
    </div>
}