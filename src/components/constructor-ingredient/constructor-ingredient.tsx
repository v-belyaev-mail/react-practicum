import {FC, useCallback, useRef} from "react";
import {IBurgerConstructorIngredient, TConstructorIngredientsSortObject} from "../../utils/types.ts";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-ingredient.module.css'
import {useAppDispatch} from "../../hooks/redux.ts";
import {burgerConstructorSlice} from "../../services/slices/burger-constructor.ts";
import {useDrag, useDrop} from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'

type TConstructorIngredientProps = {
    item: IBurgerConstructorIngredient;
    index?: number;
    type?: "top" | "bottom";
    onMove?: (sort:TConstructorIngredientsSortObject) => void;
}

type TDragIngredientProps = {
    itemId: string;
    index?: number;
}

export const ConstructorIngredient:FC<TConstructorIngredientProps> = ({item, type, index, onMove}) => {
    const dispatch = useAppDispatch();
    const ingredientRef = useRef<HTMLDivElement | null>(null)
    const [{isDragging}, ingredientDrag, ingredientPreview] = useDrag({
        type: "sort-ingredients",
        item: {
            id: item._id,
            index
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{handlerId}, ingredientDrop] = useDrop<
        TDragIngredientProps,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "sort-ingredients",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item:TDragIngredientProps, monitor) => {
            if(typeof index === "number" && typeof onMove === "function") {
                if (!ingredientRef.current || typeof item.index !== "number") {
                    return
                }
                const dragIndex = item.index
                const hoverIndex = index
                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return
                }
                // Determine rectangle on screen
                const hoverBoundingRect = ingredientRef.current.getBoundingClientRect()
                // Get vertical middle
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                // Determine mouse position
                const clientOffset = monitor.getClientOffset()
                // Get pixels to the top
                const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
                onMove({
                    hoverIndex,
                    dragIndex
                })
                item.index = hoverIndex
            }
        }
    })
    const opacity = isDragging ? 0 : 1
    ingredientDrag(ingredientDrop(ingredientRef))

    let itemName:string = item.name;
    let className:string = styles.element;

    switch (type) {
        case "bottom":
            itemName += ' (низ)';
            className += ' pl-8';
            break;
        case "top":
            itemName += ' (верх)';
            className += ' pl-8';
            break;
    }

    const onDeleteClick = useCallback(() => {
        if(index !== undefined && item.type !== "bun") {
            dispatch(burgerConstructorSlice.actions.removeIngredientByIndex(index))
        } else if(item.type === "bun") {
            dispatch(burgerConstructorSlice.actions.removeBun())
        }
    }, [dispatch])

    return (
        <div className={className} ref={ingredientRef} style={{opacity}} data-handler-id={handlerId}>
            {
                !type && <span className={styles.drag_icon} ref={ingredientPreview}>
                <DragIcon type="primary"/>
                </span>
            }
            <ConstructorElement
                type={type}
                isLocked={type !== undefined && index !== undefined}
                text={itemName}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={onDeleteClick}
            />
        </div>
    )
}