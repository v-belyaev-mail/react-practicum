import styles from './burger-constructor.module.css';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {MutableRefObject, SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {ConstructorIngredient} from "../constructor-ingredient/constructor-ingredient.tsx";
import {Modal} from "../modal/modal.tsx";
import {OrderDetails} from "../order-details/order-details.tsx";
import {useModal} from "../../hooks/useModal.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {TConstructorIngredientsSortObject, TIngredientDropData, TOrderCreateRequest} from "../../utils/types.ts";
import {sendOrder} from "../../services/slices/orders.ts";
import {useDrop} from "react-dnd";
import {burgerConstructorSlice} from "../../services/slices/burger-constructor.ts";
import {BurgerConstructorTotal} from "../burger-constructor-total/burger-constructor-total.tsx";

export const BurgerConstructor = () => {
    const dispatch = useAppDispatch();
    const {selectedBun, selectedIngredients} = useAppSelector(store => store.burgerConstructor)
    const {ingredients} = useAppSelector(store => store.ingredients)
    const {lastOrder} = useAppSelector(store => store.orders)
    const wrapperRef:MutableRefObject<HTMLUListElement | null> = useRef<HTMLUListElement>(null);
    const totalRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);
    const {isModalOpen, openModal, closeModal} = useModal();

    const [{isHover}, ref] = useDrop({
        accept: "ingredients",
        drop(item:TIngredientDropData) {
            item.type === "bun"
                ? dispatch(burgerConstructorSlice.actions.addBun(item.id))
                : dispatch(burgerConstructorSlice.actions.addIngredient(item.id))
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        })
    })

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize()
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])

    const onResize = () => {
        if(wrapperRef.current && totalRef.current) {
            const bunHeight:number = 96;
            setHeight(window.innerHeight - wrapperRef.current.offsetTop - totalRef.current.offsetHeight - bunHeight);
        }
    }

    const renderIngredient = useCallback((ingredient:string, index:number) => {
        const item = ingredients.find(
            burgerIngredient => burgerIngredient._id === ingredient
        )
        return item ? (
            <li key={`${index}_${ingredient}`}>
                <ConstructorIngredient
                    item={item}
                    index={index}
                    onMove={onSort}
                />
            </li>
        ) : null
    }, [ingredients])

    const renderBun = useCallback((type:"top"|"bottom", ingredient:string|null) => {
        const item = ingredients.find(
            burgerIngredient => burgerIngredient._id === ingredient
        )
        return item ? (
            <ConstructorIngredient
                item={item}
                type={type}
            />
        ) : (
            <ConstructorElement
                isLocked={true}
                thumbnail={'images/empty-burger.svg'}
                price={0}
                type={type}
                text="Выберите булку"
                extraClass="ml-8"
            />
        )
    }, [])

    const onSort = useCallback((sort:TConstructorIngredientsSortObject) => {
        dispatch(burgerConstructorSlice.actions.sortIngredients(sort))
    }, [])

    const onSubmitOrder = (e:SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        if(!selectedBun) return;
        const orderData: TOrderCreateRequest = {
            ingredients: [selectedBun, ...selectedIngredients, selectedBun],
        }
        dispatch(sendOrder(orderData)).then((res) => {
            if(res.payload?.number) {
                openModal();
                dispatch(burgerConstructorSlice.actions.clear())
            }
        })
    }

    return (
        <section className={styles.box}>
            <div ref={ref} className={`${styles.ingredientsBox} ${isHover ? styles.whenHoverDrop : ""}`}>
                {
                    renderBun("top", selectedBun)
                }
                <ul
                    className={styles.wrapper}
                    ref={wrapperRef}
                    style={{'maxHeight': height > 0 ? height + 'px' : 'auto'}}>
                    {
                        selectedIngredients.map((ingredient, index) =>
                            renderIngredient(ingredient, index)
                        )
                    }
                </ul>
                {
                    renderBun("bottom", selectedBun)
                }
            </div>
            <div className={styles.total} ref={totalRef}>
                <BurgerConstructorTotal onSubmit={onSubmitOrder}/>
            </div>
            {
                isModalOpen && !!lastOrder && <Modal onClose={() => closeModal()}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
)
}