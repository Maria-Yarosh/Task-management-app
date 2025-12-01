import clsx from "clsx";
import { memo, type FC, type ReactNode } from "react";
import style from './Chip.module.scss'

export type TChipVariant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'dot'
export type TChipSize = 'sm' | 'md' | 'lg'
export type TChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type TChipRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

interface IChipProps {
    variant?: TChipVariant;
    size?: TChipSize;
    color?: TChipColor;
    radius?: TChipRadius;
    children?: ReactNode;
    startContent?: ReactNode;
    endContent?: ReactNode;
    avatar?: ReactNode;
    className?: string;
}

const getChipDynamicClasses = (
    variant: TChipVariant,
    color: TChipColor,
    size: TChipSize,
    radius: TChipRadius,
) => {
    return [
        style[`variant_${variant}`],
        style[`color_${color}`],
        style[`size_${size}`],
        style[`radius_${radius}`],
    ];
};

export const Chip: FC<IChipProps> = memo((props) => {
    const {
        variant = 'solid',
        size = 'md',
        color = 'default',
        radius = 'md',
        children,
        startContent,
        endContent,
        avatar,
        className,
    } = props

    const chipClasses = clsx(
        className,
        style.chip,
                getChipDynamicClasses(variant, color, size, radius),
                {},
    )

    return (
        <div className={chipClasses}>
            {variant === 'dot' ? <div className={style.variant_dot}></div> : <>{avatar}{startContent}</>}
            {children}
            {endContent}
        </div>
    )
})
