import {memo, type FC, type ReactNode} from 'react';
import {Button as HButton} from '@headlessui/react'
import clsx from 'clsx';
import type {TIconName} from '../Icon/iconsMap';
import {Icon} from '../Icon/Icon';

import style from './Button.module.scss'


export type TButtonType = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'
export type TButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type TButtonSize = 'sm' | 'md' | 'lg'
export type TButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

interface IButtonProps {
    variant?: TButtonType;
    color?: TButtonColor;
    size?: TButtonSize;
    radius?: TButtonRadius;
    isIconOnly?: boolean;
    iconName?: TIconName;
    isLoading?: boolean;
    startContent?: ReactNode;
    endContent?: ReactNode;
    children?: ReactNode;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
}

const getButtonDynamicClasses = (
    variant: TButtonType,
    color: TButtonColor,
    size: TButtonSize,
    radius: TButtonRadius,
) => {
    return [
        style[`variant_${variant}`],
        style[`color_${color}`],
        style[`size_${size}`],
        style[`radius_${radius}`],
    ];
};

export const Button: FC<IButtonProps> = memo((props) => {
    const {
        variant = 'solid',
        color = 'default',
        size = 'md',
        radius = 'sm',
        isIconOnly,
        iconName,
        isLoading,
        startContent,
        endContent,
        children,
        fullWidth,
        className,
        disabled,
    } = props;

    const btnClasses = clsx(
        className,
        style.btn,
        getButtonDynamicClasses(variant, color, size, radius),
        {
            [style.icon_only]: isIconOnly,
            [style.loading]: isLoading,
            [style.full_width]: fullWidth,
            [style.disabled]: disabled,
        },
    );

    const content = isIconOnly && iconName
        ? <Icon name={iconName} size={size} color={'currentColor'}/>
        : <>{startContent}{children}{endContent}</>;

    return (
        <HButton className={btnClasses} disabled={disabled}>
            {content}
        </HButton>
    );
});
