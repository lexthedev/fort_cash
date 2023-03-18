import { IPopUpAction } from "@/components/interfaces/popUpAction";
import styles from "../styles/popUpAction.module.scss"

export function PopUpAction(props: IPopUpAction) {

    const { onSubmit, onCancel } = props;

    return <div className={styles.actions}>
        <button onClick={(e) => !!onSubmit && onSubmit(e)}>ok</button>
        <button onClick={() => !!onCancel && onCancel()}>cancel</button>
    </div>
}