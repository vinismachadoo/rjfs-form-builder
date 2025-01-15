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
  SquareAsterisk,
  SquareCheck,
  TextCursorInput,
  ToggleRight,
} from 'lucide-react';

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
    basics: {
      title: 'Basics',
      items: [
        {
          name: 'Text',
          url: '/components/text',
          icon: TextCursorInput,
        },
        {
          name: 'Number',
          url: '/components/number',
          icon: Hash,
        },
        {
          name: 'Select',
          url: '/components/select',
          icon: MousePointerClick,
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
        <NavComponents components={config.components.basics.items} title={config.components.basics.title} />
        <NavComponents components={config.components.booleans.items} title={config.components.booleans.title} />
        <NavComponents components={config.components.arrays.items} title={config.components.arrays.title} />

        {/* <SidebarGroup>
          <SidebarMenu>
            {config.map((item) =>
              item.items ? (
                <Collapsible key={item.title} asChild defaultOpen={true} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span className="font-medium whitespace-nowrap">{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title} className="cursor-pointer">
                            <SidebarMenuSubButton onClick={() => router.push(`${item.url}/${subItem.url}`)}>
                              <span className="text-xs">{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title} className="cursor-pointer">
                  <SidebarMenuButton tooltip={item.title} onClick={() => router.push(`${item.url}`)}>
                    {item.icon && <item.icon />}
                    <span className="font-medium whitespace-nowrap">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
