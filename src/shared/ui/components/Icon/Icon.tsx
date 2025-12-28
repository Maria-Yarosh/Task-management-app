import React from 'react';
import {iconsMap, type TIconName} from './iconsMap';
import clsx from 'clsx';

import style from './Icon.module.scss';

export type TIconSize = 'sm' | 'md' | 'lg' | 'inherit';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: TIconName;
    size?: TIconSize;
    color?: string;
    className?: string;
}

export const Icon: React.FC<IconProps> = (props) => {
    const {name, size = 'md', color, className, ...rest} = props;
    const IconComponent = iconsMap[name];

    const iconClasses = clsx(
        className,
        style[`size_${size}`]
    );

    if (!IconComponent) {
        console.warn(`Icon with name "${name}" not found.`);
        return null;
    }

    return (
        <IconComponent
            color={color}
            className={iconClasses}
            {...rest}
        />
    );
};
