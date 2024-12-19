import {FC, useEffect, useMemo, useRef, useState} from "react";
import {MenuItemType} from "./menu-types.ts";
import styles from "./menu.module.css"

const MenuItem:FC<MenuItemType> = ({title, href, icon, selected}) => {
    const Icon = icon;
    const itemRef = useRef<HTMLSpanElement |null>(null);
    const [isHovered, setHovered] = useState<boolean>(false)

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

    const textClassName:string = useMemo(() => (
        `${styles.menuButtonText} ${isHovered || selected ? styles.hovered : ''}`),
        [isHovered, selected]
    );

    return (
        <span className={styles.menuButton} ref={itemRef}>
            <Icon type={isHovered || selected ? "primary" : "secondary"}/>
            <a href={href} className={textClassName}>{title}</a>
        </span>
    )

}

export default MenuItem