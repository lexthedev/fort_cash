import { IPopup } from '@/components';
import React from 'react';
import * as styles from '../styles/popup.module.scss'

export function Popup(props: IPopup) {
    const { children, onClose } = props;
    return <div
        onClick={onClose}
        className={styles.popup}>
        <div className={styles.modal}>
            <button className={styles.close} onClick={onClose}>X</button>
            <div className={styles.content}>{children}</div>
        </div>
    </div>
}