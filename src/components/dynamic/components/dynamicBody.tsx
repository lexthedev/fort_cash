import { Footer, IDynamicBody, SideMenu } from "@/components";
import styles from "../styles/dynamicBody.module.scss"

export function DynamicBody(props: IDynamicBody) {

    const { children } = props;

    return <div className={styles.body}>
        <SideMenu />
        <div>
            {children}
        </div>
        <Footer />
    </div>
}