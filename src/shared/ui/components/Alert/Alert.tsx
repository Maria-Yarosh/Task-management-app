import { memo, useEffect, type FC, type ReactNode } from "react";
import type { TIconName } from "../Icon/iconsMap";
import style from "./Alert.module.scss";
import clsx from "clsx";
import { Icon } from "../Icon";
import { Button } from "../Button/Button";

export type TAlertColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type TAlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

interface IAlertProps {
    color?: TAlertColor;
    radius?: TAlertRadius;
    title?: string;
    description?: string;
    iconName?: TIconName;
    showClose?:boolean;
    showActions?: boolean;
    className?: string;
    autoClose?: number;
    onClickPrimaryAction?: () => void;
    onClickSecondary?: () => void;
    onClose: () => void;
    open?: boolean;
}

const getAlertDynamicClasses = (
  color: TAlertColor,
  radius: TAlertRadius
) => {
  return [
    style[`color_${color}`],
    style[`radius_${radius}`],
  ];
}

export const Alert: FC<IAlertProps> = memo((props) => {
    const {
        color = "default",
        radius = "md",
        title,
        description,
        iconName,
        showClose,
        showActions,
        className,
        autoClose = 10000,
        onClickPrimaryAction,
        onClickSecondary,
        onClose,
        open,
    } = props

    //const [ visible, setVisible ] = useState(true)

    useEffect(() => {
        if (!showClose) {
            const timer = setTimeout(() => onClose(), autoClose)
            return () => clearTimeout(timer)
        }
    }, [showClose, autoClose, onClose])

    if (!open) return null

    const isFullLayout = iconName && (title || description) && (showClose || showActions)

    const alertClasses = clsx(
        className,
        style.alert,
        getAlertDynamicClasses(color, radius),
        {
            [style.full]: isFullLayout,
            [style.compact]: !isFullLayout
        },
      )

    const renderTitle = (): ReactNode | null => {
        if (!title) return null;
        return <h3 className={style.title}>{title}</h3>
    }

    const renderDescription = (): ReactNode | null => {
        if (!description) return null;
        return <p className={style.description}>{description}</p>
    }

    const renderIcon = (): ReactNode | null => {
        if (!iconName) return null;
        return <Icon name={iconName} />;
    }

    const renderClose = ():ReactNode | null => {
        if(!showClose) return null;
        return <Button variant="ghost" isIconOnly iconName='io-close' onClick={() => onClose()}/>
    }

    const renderActions = ():ReactNode | null => {
        if(!showActions) return null;
        return (
            <div className={style.actions_btn_block}>
            <Button variant="ghost" onClick={onClickPrimaryAction}>Ok</Button>
            <Button variant="ghost" onClick={onClickSecondary}>neOk</Button>
            </div>
        )
    }
    

      return (
        <div className={alertClasses}>
            <div className={style.icon_block}>
                {renderIcon()}
            </div>
            <div className={style.description_block}>
                {renderTitle()}
                {renderDescription()}
                {renderActions()}
            </div>
            <div className={style.close_block}>
                {renderClose()}
            </div>
        </div>
      )
})