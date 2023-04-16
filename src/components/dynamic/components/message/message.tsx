import { IMessage, messageSlice, useAppDispatch } from "@/redux";
import { useEffect } from "react";
import styles from "@/components/dynamic/styles/messages/messages.module.scss";

export function Message(props: IMessage) {
    const { header, text, type, dateTimeId, timeout } = props;
    const { removeMessage } = messageSlice.actions;
    // const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const dispatch = useAppDispatch();

    function removeCurrentMessage() {
        dispatch(removeMessage(dateTimeId as string));
    }

    useEffect(() => {
        const to = setTimeout(() => {
            // removeCurrentMessage()
        }, timeout as number * 1000)
    }, [])

    return <div className={`${styles.message} ${type === 'error' && styles.error} ${type === 'info' && styles.info}`}>
        <div>{header}</div>
        <div>{text}</div>
        <div>{type}</div>
        <div>{dateTimeId}</div>
        <div className={styles.close} onClick={removeCurrentMessage}></div>
    </div>
}