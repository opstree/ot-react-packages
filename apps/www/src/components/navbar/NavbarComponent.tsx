// import React from 'react';
// import {
//     CodeIcon,
//     Grid2x2PlusIcon,
//     GlobeIcon,
//     LayersIcon,
//     UserPlusIcon,
//     Users,
//     Star,
//     FileText,
//     Shield,
//     RotateCcw,
//     Handshake,
//     Leaf,
//     HelpCircle,
//     DollarSign,
//     BarChart,
//     PlugIcon,
//     MenuIcon,
//     XIcon,
// } from 'lucide-react';
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuList,
//     NavigationMenuItem,
//     NavigationMenuTrigger,
//     NavigationMenuLink,
//     type NavItemType,
//     // NavGridCard,
//     NavSmallItem,
//     NavLargeItem,
// } from './Navbar';
// import { cn } from '@/lib/utils';

// export const productLinks: NavItemType[] = [
//     {
//         title: 'Website Builder',
//         href: '#',
//         description: 'Create responsive websites with ease',
//         icon: GlobeIcon,
//     },
//     {
//         title: 'Cloud Platform',
//         href: '#',
//         description: 'Deploy and scale apps in the cloud',
//         icon: LayersIcon,
//     },
//     {
//         title: 'Team Collaboration',
//         href: '#',
//         description: 'Tools to help your teams work better together',
//         icon: UserPlusIcon,
//     },
//     {
//         title: 'Analytics',
//         href: '#',
//         icon: BarChart,
//     },
//     {
//         title: 'Integrations',
//         href: '#',
//         icon: PlugIcon,
//     },
//     {
//         title: 'E-Commerce',
//         href: '#',
//         icon: DollarSign,
//     },
//     {
//         title: 'Security',
//         href: '#',
//         icon: Shield,
//     },
//     {
//         title: 'API',
//         href: '#',
//         icon: CodeIcon,
//     },
// ];

// export const companyLinks: NavItemType[] = [
//     {
//         title: 'About Us',
//         href: '#',
//         description: 'Learn more about our story and team',
//         icon: Users,
//     },
//     {
//         title: 'Customer Stories',
//         href: '#',
//         description: 'See how we’ve helped our clients succeed',
//         icon: Star,
//     },
//     {
//         title: 'Terms of Service',
//         href: '#',
//         description: 'Understand how we operate',
//         icon: FileText,
//     },
//     {
//         title: 'Privacy Policy',
//         href: '#',
//         description: 'How we protect your information',
//         icon: Shield,
//     },
//     {
//         title: 'Refund Policy',
//         href: '#',
//         description: 'Details about refunds and cancellations',
//         icon: RotateCcw,
//     },
//     {
//         title: 'Partnerships',
//         href: '#',
//         icon: Handshake,
//         description: 'Collaborate with us for mutual growth',
//     },
//     {
//         title: 'Blog',
//         href: '#',
//         icon: Leaf,
//         description: 'Insights, tutorials, and company news',
//     },
//     {
//         title: 'Help Center',
//         href: '#',
//         icon: HelpCircle,
//         description: 'Find answers to your questions',
//     },
// ];

// export default function Navbar() {
//     return (
//         <div className="relative fixed top-5 w-full px-4">
//             <div
//                 aria-hidden="true"
//                 className={cn(
//                     'absolute inset-0 -z-10 size-full',
//                     'bg-[radial-gradient(color-mix(in_oklab,--theme(--color-foreground/.2)30%,transparent)_2px,transparent_2px)]',
//                     'bg-[size:12px_12px]',
//                 )}
//             />

//             <div className="bg-background sticky top-1/4 z-50 mx-auto h-14 w-full max-w-4xl border px-4  rounded-lg">
//                 <div className="flex h-full items-center justify-between">
//                     <div className="flex items-center gap-2">
//                         <Grid2x2PlusIcon className="size-6" />
//                         <p className="font-mono text-lg font-bold">Asme</p>
//                     </div>
//                     <DesktopMenu />

//                     <div className="flex items-center gap-2">
//                         <button>Get Started</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function DesktopMenu() {
//     return (
//         <NavigationMenu className="hidden lg:block">
//             <NavigationMenuList>
//                 <NavigationMenuItem>
//                     <NavigationMenuTrigger>Product</NavigationMenuTrigger>
//                     {/* <NavigationMenuContent>
//                         <div className="grid w-full md:w-4xl md:grid-cols-[1fr_.30fr]">
//                             <ul className="grid grow gap-4 p-4 md:grid-cols-3 md:border-r">
//                                 {productLinks.slice(0, 3).map((link) => (
//                                     <li key={link.href}>
//                                         <NavGridCard link={link} />
//                                     </li>
//                                 ))}
//                             </ul>
//                             <ul className="space-y-1 p-4">
//                                 {productLinks.slice(3).map((link) => (
//                                     <li key={link.href}>
//                                         <NavSmallItem
//                                             item={link}
//                                             href={link.href}
//                                             className="gap-x-1"
//                                         />
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </NavigationMenuContent> */}
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
//                     <NavigationMenuTrigger>Company</NavigationMenuTrigger>
//                     {/* <NavigationMenuContent>
//                         <div className="grid w-full md:w-4xl md:grid-cols-[1fr_.40fr]">
//                             <ul className="grid grow grid-cols-2 gap-4 p-4 md:border-r">
//                                 {companyLinks.slice(0, 2).map((link) => (
//                                     <li key={link.href}>
//                                         <NavGridCard link={link} className="min-h-36" />
//                                     </li>
//                                 ))}
//                                 <div className="col-span-2 grid grid-cols-3 gap-x-4">
//                                     {companyLinks.slice(2, 5).map((link) => (
//                                         <li key={link.href}>
//                                             <NavLargeItem href={link.href} link={link} />
//                                         </li>
//                                     ))}
//                                 </div>
//                             </ul>
//                             <ul className="space-y-2 p-4">
//                                 {companyLinks.slice(5, 10).map((link) => (
//                                     <li key={link.href}>
//                                         <NavLargeItem href={link.href} link={link} />
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </NavigationMenuContent> */}
//                 </NavigationMenuItem>
//                 <NavigationMenuItem>
//                     <NavigationMenuLink className="cursor-pointer">
//                         Pricing
//                     </NavigationMenuLink>
//                 </NavigationMenuItem>
//             </NavigationMenuList>
//         </NavigationMenu>
//     );
// }

// // function MoileNav() {
// // 	const sections = [
// // 		{
// // 			id: 'product',
// // 			name: 'Product',
// // 			list: productLinks,
// // 		},
// // 		{
// // 			id: 'company',
// // 			name: 'Company',
// // 			list: companyLinks,
// // 		},
// // 	];

// // 	return (
// // 		<Sheet>
// // 			<SheetTrigger asChild>
// // 				<Button size="icon" variant="ghost" className="rounded-full lg:hidden">
// // 					<MenuIcon className="size-5" />
// // 				</Button>
// // 			</SheetTrigger>
// // 			<SheetContent
// // 				className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
// // 				showClose={false}
// // 			>
// // 				<div className="flex h-14 items-center justify-end border-b px-4">
// // 					<SheetClose asChild>
// // 						<Button size="icon" variant="ghost" className="rounded-full">
// // 							<XIcon className="size-5" />
// // 							<span className="sr-only">Close</span>
// // 						</Button>
// // 					</SheetClose>
// // 				</div>
// // 				<div className="container grid gap-y-2 overflow-y-auto px-4 pt-5 pb-12">
// // 					<Accordion type="single" collapsible>
// // 						{sections.map((section) => (
// // 							<AccordionItem key={section.id} value={section.id}>
// // 								<AccordionTrigger className="capitalize hover:no-underline">
// // 									{section.id}
// // 								</AccordionTrigger>
// // 								<AccordionContent className="space-y-1">
// // 									<ul className="grid gap-1">
// // 										{section.list.map((link) => (
// // 											<li key={link.href}>
// // 												<SheetClose asChild>
// // 													<NavItemMobile item={link} href={link.href} />
// // 												</SheetClose>
// // 											</li>
// // 										))}
// // 									</ul>
// // 								</AccordionContent>
// // 							</AccordionItem>
// // 						))}
// // 					</Accordion>
// // 				</div>
// // 			</SheetContent>
// // 		</Sheet>
// // 	);
// // }


// import * as React from 'react';
// import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
// import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

// import { cn } from '@/lib/utils';

// type NavItemType = {
//     title: string;
//     href: string;
//     description?: string;
//     icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
// };

// function NavigationMenu({
//     className,
//     children,
//     viewport = true,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
//     viewport?: boolean;
// }) {
//     return (
//         <NavigationMenuPrimitive.Root
//             data-slot="navigation-menu"
//             data-viewport={viewport}
//             className={cn(
//                 'group/navigation-menu flex max-w-max flex-1 items-center justify-center',
//                 className,
//             )}
//             {...props}
//         >
//             {children}
//             {viewport && <NavigationMenuViewport />}
//         </NavigationMenuPrimitive.Root>
//     );
// }

// function NavigationMenuList({
//     className,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
//     return (
//         <NavigationMenuPrimitive.List
//             data-slot="navigation-menu-list"
//             className={cn(
//                 'group flex flex-1 list-none items-center justify-center gap-1',
//                 className,
//             )}
//             {...props}
//         />
//     );
// }

// function NavigationMenuItem({
//     className,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
//     return (
//         <NavigationMenuPrimitive.Item
//             data-slot="navigation-menu-item"
//             className={cn('relative', className)}
//             {...props}
//         />
//     );
// }

// function NavigationMenuTrigger({
//     className,
//     children,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
//     return (
//         <NavigationMenuPrimitive.Trigger
//             data-slot="navigation-menu-trigger"
//             className={cn(
//                 'group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 inline-flex w-max items-center justify-center rounded-md px-4 py-1 text-sm font-medium transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50',
//                 className,
//             )}
//             {...props}
//         >
//             {children}{' '}
//             <ChevronDownIcon
//                 className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
//                 aria-hidden="true"
//             />
//         </NavigationMenuPrimitive.Trigger>
//     );
// }

// function NavigationMenuContent({
//     className,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
//     return (
//         <NavigationMenuPrimitive.Content
//             data-slot="navigation-menu-content"
//             className={cn(
//                 'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto',
//                 'group-data-[viewport=false]/navigation-menu:bg-background/80 group-data-[viewport=false]/navigation-menu:text-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-300 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
//                 className,
//             )}
//             {...props}
//         />
//     );
// }

// function NavigationMenuViewport({
//     className,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
//     return (
//         <div className="absolute top-full left-0 isolate z-50 flex justify-center">
//             <NavigationMenuPrimitive.Viewport
//                 data-slot="navigation-menu-viewport"
//                 className={cn(
//                     'origin-top-center bg-background/95 supports-[backdrop-filter]:bg-background/60 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow backdrop-blur-xl md:w-[var(--radix-navigation-menu-viewport-width)]',
//                     className,
//                 )}
//                 {...props}
//             />
//         </div>
//     );
// }

// function NavigationMenuLink({
//     className,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
//     return (
//         <NavigationMenuPrimitive.Link
//             data-slot="navigation-menu-link"
//             className={cn(
//                 "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col justify-center gap-1 rounded-sm px-4 py-1 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
//                 className,
//             )}
//             {...props}
//         />
//     );
// }

// function NavigationMenuIndicator({
//     className,
//     ...props
// }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
//     return (
//         <NavigationMenuPrimitive.Indicator
//             data-slot="navigation-menu-indicator"
//             className={cn(
//                 'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
//                 className,
//             )}
//             {...props}
//         >
//             <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
//         </NavigationMenuPrimitive.Indicator>
//     );
// }

// // function NavGridCard({
// // 	link,
// // 	...props
// // }: React.ComponentProps<'div'> & {
// // 	link: NavItemType;
// // }) {
// // 	return (
// // 		<NavigationMenuPrimitive.Link asChild>
// // 			<GridCard {...props}>
// // 				{link.icon && (
// // 					<link.icon className="text-foreground/80 relative size-5" />
// // 				)}
// // 				<div className="relative">
// // 					<span className="text-foreground/80 text-sm font-medium">
// // 						{link.title}
// // 					</span>
// // 					{link.description && (
// // 						<p className="text-muted-foreground mt-2 text-xs">
// // 							{link.description}
// // 						</p>
// // 					)}
// // 				</div>
// // 			</GridCard>
// // 		</NavigationMenuPrimitive.Link>
// // 	);
// // }

// // function NavSmallItem({
// //     item,
// //     className,
// //     ...props
// // }: React.ComponentProps<typeof NavigationMenuLink> & {
// //     item: Omit<NavItemType, 'description'>;
// // }) {
// //     return (
// //         <NavigationMenuLink
// //             className={cn(
// //                 'group relative h-max flex-row items-center gap-x-3 px-2 py-2',
// //                 className,
// //             )}
// //             {...props}
// //         >
// //             {item.icon && <item.icon />}
// //             <p className="text-sm">{item.title}</p>
// //             <div className="relative ml-auto flex h-full w-4 items-center">
// //                 <ArrowRightIcon className="size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
// //             </div>
// //         </NavigationMenuLink>
// //     );
// // }

// // function NavLargeItem({
// //     link,
// //     className,
// //     ...props
// // }: React.ComponentProps<typeof NavigationMenuLink> & {
// //     link: NavItemType;
// // }) {
// //     return (
// //         <NavigationMenuLink
// //             className={cn(
// //                 'bg-background group relative flex flex-col justify-center border p-0',
// //                 className,
// //             )}
// //             {...props}
// //         >
// //             <div className="flex items-center justify-between px-5 py-4">
// //                 <div className="space-y-1">
// //                     <span className="text-sm leading-none font-medium">{link.title}</span>
// //                     {link.description && (
// //                         <p className="text-muted-foreground line-clamp-1 text-xs">
// //                             {link.description}
// //                         </p>
// //                     )}
// //                 </div>
// //                 {link.icon && <link.icon className="text-muted-foreground size-6" />}
// //             </div>
// //         </NavigationMenuLink>
// //     );
// // }

// // function NavItemMobile({
// //     item,
// //     className,
// //     ...props
// // }: React.ComponentProps<'a'> & {
// //     item: NavItemType;
// // }) {
// //     return (
// //         <a
// //             className={cn(
// //                 "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground group relative flex gap-1 gap-x-2 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
// //                 className,
// //             )}
// //             {...props}
// //         >
// //             <div
// //                 className={cn(
// //                     'bg-muted/20 flex size-10 items-center justify-center rounded-lg border',
// //                 )}
// //             >
// //                 {item.icon && <item.icon />}
// //             </div>
// //             <div className={cn('flex h-10 flex-col justify-center')}>
// //                 <p className="text-sm">{item.title}</p>
// //                 <span className="text-muted-foreground line-clamp-1 text-xs leading-snug">
// //                     {item.description}
// //                 </span>
// //             </div>
// //         </a>
// //     );
// // }

// // export {
// //     NavigationMenu,
// //     NavigationMenuList,
// //     NavigationMenuItem,
// //     NavigationMenuContent,
// //     NavigationMenuTrigger,
// //     NavigationMenuLink,
// //     NavigationMenuIndicator,
// //     NavigationMenuViewport,
// //     // NavGridCard,
// //     NavSmallItem,
// //     NavLargeItem,
// //     NavItemMobile,
// //     type NavItemType,
// // };
