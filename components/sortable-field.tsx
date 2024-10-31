/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableFieldProps {
  field: any;
  children: React.ReactNode;
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
}

export function SortableField({ field, children }: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move hover:text-blue-500"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="pl-8">{children}</div>
    </div>
  );
}
