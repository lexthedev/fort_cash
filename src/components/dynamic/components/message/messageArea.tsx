import { useAppSelector } from "@/redux";
import { Message } from "../../../index";
import styles from "@/components/dynamic/styles/messages/messages.module.scss"

export function MessageArea() {
    const { messages } = useAppSelector(state => state.messageReducer);

    console.log('messages', messages.length);

    return <div className={styles.messageList}>
        {messages.map(msg => <Message key={msg.dateTimeId} {...msg} />)}
    </div>
}