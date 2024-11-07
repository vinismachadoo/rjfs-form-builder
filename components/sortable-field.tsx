/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from '@/lib/utils';
import { FieldTypes } from '@/types/form-field';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva, VariantProps } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';

const sortableFieldVariants = cva('relative border rounded-sm hover:opacity-90', {
  variants: {
    variant: {
      [FieldTypes.string]:
        'bg-[theme(colors.yellow.400/.1)] text-[theme(colors.yellow.500)] border-[theme(colors.yellow.300)]',
      [FieldTypes.number]:
        'bg-[theme(colors.teal.400/.1)] text-[theme(colors.teal.500)] border-[theme(colors.teal.300)]',
      [FieldTypes.checkbox]:
        'bg-[theme(colors.pink.400/.1)] text-[theme(colors.pink.500)] border-[theme(colors.pink.300)]',
    },
  },
  defaultVariants: {
    variant: FieldTypes.string,
  },
});

interface SortableFieldProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof sortableFieldVariants> {
  field: any;
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
}

function SortableField({ field, children, style, className, variant }: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...sortableStyle, ...style }}
      className={cn(sortableFieldVariants({ variant }), className)}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-2 bottom-0 w-8 flex items-start justify-center cursor-move"
      >
        <GripVertical className="size-4" />
      </div>
      <div className="pl-8">{children}</div>
    </div>
  );
}
export { SortableField, sortableFieldVariants };
