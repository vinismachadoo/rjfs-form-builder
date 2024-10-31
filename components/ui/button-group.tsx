import { ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface ButtonGroupProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactElement<ButtonProps>[];
}

const ButtonGroup = React.forwardRef<HTMLButtonElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', children }) => {
    const totalButtons = React.Children.count(children);
    const isHorizontal = orientation === 'horizontal';
    const isVertical = orientation === 'vertical';

    return (
      <div
        className={cn(
          'flex',
          {
            'flex-col': isVertical,
            'w-fit': isVertical,
          },
          className
        )}
      >
        {React.Children.map(children, (child, index) => {
          const isFirst = index === 0;
          const isLast = index === totalButtons - 1;

          return React.cloneElement(child, {
            className: cn(
              {
                'rounded-l-none': isHorizontal && !isFirst,
                'rounded-r-none': isHorizontal && !isLast,
                'border-l-0': isHorizontal && !isFirst,

                'rounded-t-none': isVertical && !isFirst,
                'rounded-b-none': isVertical && !isLast,
                'border-t-0': isVertical && !isFirst,
              },
              child.props.className
            ),
          });
        })}
      </div>
    );
  }
);
ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
