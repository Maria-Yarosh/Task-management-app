import { memo, type FC, type ReactNode } from "react";
import style from "./Avatar.module.scss";
import clsx from "clsx";
import { Icon } from "../Icon";
import type { TIconName } from "../Icon/iconsMap";

export type TAvatarColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type TAvatarSize = "sm" | "md" | "lg";
export type TAvatarRadius = "none" | "sm" | "md" | "lg" | "full";
export type TAvatarText = {
  firstName: string;
  lastName: string;
};

interface IAvatarProps {
  color?: TAvatarColor;
  size?: TAvatarSize;
  radius?: TAvatarRadius;
  iconName?: TIconName;
  imageSrc?: string;
  text?: TAvatarText;
  className?: string;
}

const getAvatarDynamicClasses = (
  color: TAvatarColor,
  size: TAvatarSize,
  radius: TAvatarRadius
) => {
  return [
    style[`color_${color}`],
    style[`size_${size}`],
    style[`radius_${radius}`],
  ];
};

const getAvatarText = (text?: TAvatarText) => {
  if (!text) return "";

  const f = (text.firstName || "").trim();
  const l = (text.lastName || "").trim();
  const fi = f ? f[0].toUpperCase() : "";
  const li = l ? l[0].toUpperCase() : "";

  return fi + li || "";
};

export const Avatar: FC<IAvatarProps> = memo((props) => {
  const {
    color = "default",
    size = "md",
    radius = "full",
    iconName,
    imageSrc,
    text,
    className,
  } = props;

  const avatarClasses = clsx(
    className,
    style.avatar,
    getAvatarDynamicClasses(color, size, radius),
    {}
  );

  const renderImage = (): ReactNode | null => {
    if (!imageSrc) return null;
    return <img src={imageSrc} className={style.img} />
  };

  const renderIcon = (): ReactNode | null => {
    if (!iconName) return null;
    return <Icon name={iconName} />;
  };

  const renderText = (): ReactNode | null => {
    const avatarText = getAvatarText(text);
    if (!avatarText) return null;
    return <span className={style.text}>{avatarText}</span>;
  };

  return (
    <div className={avatarClasses}>
      {imageSrc ? renderImage() : iconName ? renderIcon() : renderText()}
    </div>
  );
});
