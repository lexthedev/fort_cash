import { Footer, IDynamicBody, SideMenu } from "@/components";
import styles from "../styles/dynamicBody.module.scss"

export function DynamicBody(props: IDynamicBody) {

    const { children, popups } = props;

    return <div className={styles.body}>
        <SideMenu />
        <div className={styles.mainContent}>
            {children}
        </div>
        <Footer popups={popups} />
    </div>
}