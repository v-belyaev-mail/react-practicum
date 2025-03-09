import {FC, ReactNode, useCallback, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay.tsx";

type ModalProps = {
    title?: string | (() => string);
    titleClassName?: string;
    children: ReactNode;
    onClose: () => void;
}

export const Modal:FC<ModalProps> = ({title, children, onClose, titleClassName}) => {
    const container:HTMLElement|null = document.getElementById('modals');

    useEffect(() => {
        const onKeyboardClick:(ev:KeyboardEvent) => void = (ev) => {
            if(ev.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keyup', onKeyboardClick);

        return () => {
            document.removeEventListener('keyup', onKeyboardClick);
        }
    }, []);

    const onCloseClick:() => void = useCallback(() => {
        onClose()
    }, [onClose])

    const titleClass = titleClassName ? `${styles.title} ${titleClassName}` : styles.title

    return container && createPortal(
    <>
        <div className={styles.modal}>
            {
                title ?
                    <header className={styles.header}>
                        <h1 className={titleClass}>{typeof title === "function" ? title() : title}</h1>
                        <CloseIcon type={"primary"} onClick={onCloseClick} className={styles.close_icon}/>
                    </header> :
                    <CloseIcon type={"primary"} onClick={onCloseClick} className={styles.close_icon_no_title}/>
            }
            <main>
                {children}
            </main>
        </div>
        <ModalOverlay onClick={onCloseClick}></ModalOverlay>
    </>, container)
}