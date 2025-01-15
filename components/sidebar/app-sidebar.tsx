'use client';

import { NavComponents } from '@/components/sidebar/nav-components';
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar';
import {
  AtSign,
  Blocks,
  Calendar,
  CheckCheck,
  CircleDot,
  Clock,
  CopyCheck,
  Hash,
  Loader,
  MousePointerClick,
  SlidersHorizontal,
  SquareAsterisk,
  SquareCheck,
  Tally5,
  TextCursorInput,
  ToggleRight,
} from 'lucide-react';

type ComponentConfig = typeof config.components;
type ComponentKeys = keyof ComponentConfig;

export const config = {
  dashboard: [
    {
      title: 'Dashboard',
      url: '/',
      icon: Loader,
    },
  ],
  builder: {
    title: 'Builder',
    url: '/builder',
    icon: Blocks,
  },
  components: {
    string: {
      title: 'String',
      items: [
        {
          name: 'Basic Text',
          url: '/components/basic-text',
          icon: TextCursorInput,
        },
        {
          name: 'Numeric Text',
          url: '/components/numeric-text',
          icon: Tally5,
        },
        {
          name: 'Email',
          url: '/components/email',
          icon: AtSign,
        },
        {
          name: 'Password',
          url: '/components/password',
          icon: SquareAsterisk,
        },
      ],
    },
    numbers: {
      title: 'Numbers',
      items: [
        {
          name: 'Number Input',
          url: '/components/number-input',
          icon: Hash,
        },
        {
          name: 'Number Slider',
          url: '/components/number-slider',
          icon: SlidersHorizontal,
        },
      ],
    },
    dates: {
      title: 'Dates',
      items: [
        {
          name: 'Date',
          url: '/components/date',
          icon: Calendar,
        },
        {
          name: 'Time',
          url: '/components/time',
          icon: Clock,
        },
      ],
    },
    options: {
      title: 'Options',
      items: [
        {
          name: 'Select',
          url: '/components/select',
          icon: MousePointerClick,
        },
        {
          name: 'Radio group',
          url: '/components/radio-group',
          icon: CircleDot,
        },
      ],
    },
    booleans: {
      title: 'Booleans',
      items: [
        {
          name: 'Switch',
          url: '/components/switch',
          icon: ToggleRight,
        },
        {
          name: 'Checkbox',
          url: '/components/checkbox',
          icon: SquareCheck,
        },
      ],
    },
    arrays: {
      title: 'Arrays',
      items: [
        {
          name: 'Checkbox group',
          url: '/components/checkbox-group',
          icon: CopyCheck,
        },
        {
          name: 'Multiselect',
          url: '/components/multiselect',
          icon: CheckCheck,
        },
      ],
    },
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        {(Object.keys(config.components) as ComponentKeys[]).map((key) => (
          <NavComponents key={key} components={config.components[key].items} title={config.components[key].title} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
