import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {loading ? 'Загрузка...' : children}
    </button>
  );
};
