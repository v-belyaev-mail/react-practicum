import {FC} from "react";
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

export type MenuItemType = {
    title: string,
    href?: string,
    icon: FC<TIconProps>
    selected?: boolean;
}