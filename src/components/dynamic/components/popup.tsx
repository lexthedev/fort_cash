import { IPopup } from '@/components';
import { useAppDispatch } from '@/redux';
import { popupSlice } from '@/redux/reducers/popupReducer';
import React from 'react';
import styles from '../styles/popup.module.scss'

export function Popup(props: IPopup) {

    const { title, children, onClose } = props;
    const dispatch = useAppDispatch();
    const { removePopup } = popupSlice.actions;

    function close() {
        !!onClose && onClose()
        dispatch(removePopup())
    }

    function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.key) {
            case 'Escape':
                close()
                break;

            default:
                break;
        }
    }

    return <div
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePress(e)}
        onClick={close}
        className={styles.popup}>
        <div className={styles.modal}
            onClick={(e) => e.stopPropagation()}>
            <div className={styles.title}>
                <h3>{title}</h3>
                <div className={styles.close} onClick={close}></div>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    </div>
}