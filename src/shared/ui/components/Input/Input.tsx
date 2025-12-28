import { memo, useRef, type ChangeEvent, type FC, type ReactNode } from 'react'
import style from './Input.module.scss'
import clsx from 'clsx'


export type TInputVariant = 'bordered' | 'underlined'
export type TInputSize = 'sm' | 'lg'
export type TInputColor = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type TInputRadius = 'none' | 'md' | 'full'
export type TInputLabelPlacement = 'outside' | 'outside-left'

interface IInputProps {
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TInputColor;
  radius?: TInputRadius;
  labelPlacement?: TInputLabelPlacement;
  selected?: boolean;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  description?: string;
  endContent?: ReactNode;
  startContent?: ReactNode;
  className?: string;
  label?: string;
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  onToggle?: (value: boolean) => void;
}

const getInputDynamicClasses = (
    variant: TInputVariant,
    size: TInputSize,
    radius: TInputRadius,
) => {
    return [
        style[`variant_${variant}`],
        style[`size_${size}`],
        style[`radius_${radius}`],
    ];
}

export const Input: FC<IInputProps> = memo((props) => {
  const {
    variant = 'bordered',
    size = 'sm',
    color = 'default',
    radius = 'md',
    labelPlacement = 'outside',
    selected,
    value,
    placeholder,
    isRequired,
    description,
    endContent,
    startContent,
    className,
    label,
    onChange,
    onToggle,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleContainerInputClick = () => {
    inputRef.current?.focus()
  }

  const containerClasses = clsx(
    style.container,
    style[`color_${color}`],
    {
      [style.column]: labelPlacement === 'outside',
      [style.row]: labelPlacement === 'outside-left',
    }
  )

  const inputClasses = clsx(
    style.input,
    getInputDynamicClasses(variant, size, radius),
    {
      [style.focus]: selected,
    },
    className,
  )

  return (
    <div className={containerClasses}>
      {label && <div className={style.label}>{label} {isRequired && <span className={style.required}>*</span>}</div>}
      <div className={inputClasses} onClick={handleContainerInputClick}>
        {startContent && <div className={style.start_end_content}>{startContent}</div>}
        <input ref={inputRef} placeholder={placeholder} value={value} onBlur={() => onToggle?.(false)} onFocus={() => onToggle?.(true)} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value, e)}/>
        {endContent && <div className={style.start_end_content}>{endContent}</div>}
      </div>
      {description && <div className={style.description}>{description}</div>}
    </div>
  )

})