import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export const Button = ({
  href = '#',
  variant = 'default',
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-block px-6 py-2 transition duration-300 font-semibold rounded-xl shadow-md';

  const variants = {
    default: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-black',
    outline: 'text-black border border-black hover:bg-black hover:text-white',
  };

  return (
    <a
      href={href}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
};
