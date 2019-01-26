import * as React from 'react';

export interface IButton {
  callback?: () => void;
  className?: string;
  text: string;
};

// tslint:disable:jsx-no-lambda
export const Button: React.FC<IButton>
= ({callback, className, text}): JSX.Element => {
    return (
      <button className={className}
        onClick={callback ? () => callback() : undefined}>
        {text}
      </button>
    );
  };
