export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
  icon?: React.ReactNode
  items?: NavItem[],
  className?: string,
  pathname?: string,
  setIsOpen?: (open: boolean) => void
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface SidebarNavItem extends NavItemWithChildren { }