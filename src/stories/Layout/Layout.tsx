import clsx from 'clsx';

import style from './Layout.module.scss';

export enum ELayoutVerticalAlign {
    top,
    center,
    bottom,
}

interface ILayoutCategoryItem {
    children?: any;
    hint?: string;
    group?: ILayoutCategoryItem[];
    darkUnderlay?: boolean;
    style?: React.CSSProperties;
}

export interface ILayoutCategory {
    title?: string;
    items: ILayoutCategoryItem[];
    verticalAlign?: ELayoutVerticalAlign;
    columnItems?: boolean;
    itemsStyle?: React.CSSProperties;
    isEnableTwoElementsInRow?: boolean;
}

interface ILayoutProps {
    title?: string;
    data: ILayoutCategory[];
}

export const Layout: React.FC<ILayoutProps> = (props) => (
    <div className={style.layout}>
        <div className={style.title}>{props.title}</div>
        {props.data.map((category, index) => <Category {...category} key={index}/>)}
    </div>
);

const Category: React.FC<ILayoutCategory> = (props) => {
    const itemsClasses = clsx(
        style.category_items,
        props.verticalAlign === ELayoutVerticalAlign.center && style.category_items_center,
        props.verticalAlign === ELayoutVerticalAlign.bottom && style.category_items_bottom,
        props.columnItems && style.category_items_column,
        props.isEnableTwoElementsInRow && style.category_items_custom,
    );
    return (
        <div className={style.category}>
            {props.title && <div className={style.category_title}>{props.title}</div>}
            <div className={itemsClasses} style={props.itemsStyle}>
                {props.items.map((item, index) => <Item {...item} key={index}/>)}
            </div>
        </div>
    );
}

const Item: React.FC<ILayoutCategoryItem> = (props) => (
    <div style={props.style} className={clsx({[style.category_items]: props.group})}>
        {
            props.group
                ? props.group.map((groupItem, index) => <Item {...groupItem} key={index}/>)
                : <><div className={clsx({[style.dark_underlay]: props.darkUnderlay})}>{props.children}</div>{props.hint && <div className={style.hint}>{props.hint}</div>}</>
        }
    </div>
);
