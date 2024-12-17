import {Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import {MenuItemType} from "./menu-types.ts";
import styles from "./menu.module.css"

const MenuItem:FC<MenuItemType> = ({title, href, icon}) => {
    const Icon = icon;
    const itemRef: MutableRefObject<HTMLSpanElement | null> = useRef<HTMLSpanElement>(null);
    const [isHovered, setHovered]:[boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

    useEffect(() => {
        if(itemRef?.current) {
            itemRef.current.addEventListener('mouseenter', onHover)
            itemRef.current.addEventListener('mouseleave', onHoverOut)
        }

        return () => {
            itemRef.current?.removeEventListener('mouseenter', onHover)
            itemRef.current?.removeEventListener('mouseleave', onHoverOut)
        }
    }, [])

    const onHover: () => void = () => {
        setHovered(true)
    }

    const onHoverOut: () => void = () => {
        setHovered(false)
    }

    const textClassName:string = useMemo(() => `${styles.menuButtonText} ${isHovered ? styles.hovered : ''}`, [isHovered ])

    return (
        <span className={styles.menuButton} ref={itemRef}>
            <Icon type={isHovered ? "primary" : "secondary"}/>
            <a href={href} className={textClassName}>{title}</a>
        </span>
    )

}

export default MenuItem