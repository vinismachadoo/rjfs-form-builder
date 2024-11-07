'use client';

import { Badge } from '@/components/ui/badge';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { type LucideIcon } from 'lucide-react';

export function NavComponents({
  components,
  title,
}: {
  components: {
    name: string;
    url: string;
    icon: LucideIcon;
    badge?: string;
    disabled?: boolean;
  }[];
  title: string;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {components.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.disabled ? '#' : item.url}>
                <item.icon />
                <span>{item.name}</span>
                {item.badge && (
                  <Badge className="rounded-full px-1.5 py-0 bg-lime-500 text-primary text-[0.6rem]">
                    {item.badge}
                  </Badge>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
