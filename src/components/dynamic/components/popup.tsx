import { IPopup } from '@/components';
import React from 'react';
import styles from '../styles/popup.module.scss'

export function Popup(props: IPopup) {

    const { title, children, onClose } = props;

    function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'Escape':
                !!onClose && onClose()
                break;

            default:
                break;
        }
    }

    return <div
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)}
        onClick={onClose}
        className={styles.popup}>
        <div className={styles.modal}
            onClick={(e) => e.stopPropagation()}>
            <div className={styles.title}>
                <h3>{title}</h3>
                <div className={styles.close} onClick={onClose}></div>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    </div>
}