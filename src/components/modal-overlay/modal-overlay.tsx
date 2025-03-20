import styles from './modal-overlay.module.css';
import {FC} from "react";

type ModalOverlayProps = {
    onClick?: () => void;
}

export const ModalOverlay:FC<ModalOverlayProps> = ({onClick}) => {
    return (
        <div className={styles.overlay} data-cy="modal-overlay" onClick={() => onClick && onClick()}></div>
    )
}