"use client";

import { Logo } from "@/components/pro-blocks/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const MENU_ITEMS = [
  { 
    label: "Platform", 
    href: "/platform",
    dropdown: [
      { label: "Overview", href: "/platform" },
      { label: "Feature Modules", href: "/#platform" },
      { label: "Internal Tools", href: "/internal-tools" },
    ]
  },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Resources", href: "/resources" },
] as const;

interface NavMenuItemsProps {
  className?: string;
}

const NavMenuItems = ({ className }: NavMenuItemsProps) => (
  <NavigationMenu delayDuration={0} viewport={false} className={`${className ?? ""}`}>
    <NavigationMenuList className="flex flex-col gap-1 md:flex-row">
      <NavigationMenuItem>
        <Link href="/">
          <Button variant="ghost" className="w-full md:w-auto font-mono text-[13px] text-[#737373] hover:text-[#0A0A0A] dark:hover:text-[#F7F6F3] tracking-tight">
            Home
          </Button>
        </Link>
      </NavigationMenuItem>
      {MENU_ITEMS.map((item) => {
        if (item.dropdown) {
          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger className="w-full md:w-auto font-mono text-[13px] text-[#737373] hover:text-[#0A0A0A] dark:hover:text-[#F7F6F3] tracking-tight">
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!bg-white dark:!bg-[#141414] !text-[#0A0A0A] dark:!text-[#F7F6F3] !border !border-[#E3E3E0] dark:!border-[#2A2A2A] !shadow-none !rounded-[3px] !mt-1.5 !overflow-visible !z-[100]">
                <ul className="flex flex-col gap-1 p-2 w-56 min-w-[200px]">
                  {item.dropdown.map((dropdownItem) => (
                    <li key={dropdownItem.label}>
                      <NavigationMenuLink asChild>
                        <Link 
                          href={dropdownItem.href}
                          className="block w-full px-3 py-2 text-sm rounded-[3px] text-[#0A0A0A] dark:text-[#F7F6F3] hover:bg-[#F0EFE9] dark:hover:bg-[#1A1A1A] transition-colors cursor-pointer font-mono text-[13px]"
                        >
                          {dropdownItem.label}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }
        return (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href}>
              <Button variant="ghost" className="w-full md:w-auto font-mono text-[13px] text-[#737373] hover:text-[#0A0A0A] dark:hover:text-[#F7F6F3] tracking-tight">
                {item.label}
              </Button>
            </Link>
          </NavigationMenuItem>
        );
      })}
    </NavigationMenuList>
  </NavigationMenu>
);

export function LpNavbar1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-[#F7F6F3]/95 dark:bg-[#0A0A0A]/95 backdrop-blur-sm sticky top-0 isolate z-50 border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
      {/* Main Navbar Container - Logo at absolute left edge */}
      <div className="container mx-auto relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo - positioned at absolute left edge with padding for spacing */}
          <Link href="/" className="flex items-center h-full py-2 pl-4 sm:pl-6">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-row gap-3 md:flex md:items-center pr-4 sm:pr-6">
            <NavMenuItems />
            <ThemeToggle />
            <Link href="/contact">
              <Button className="bg-[#0A0A0A] dark:bg-[#F7F6F3] text-white dark:text-[#0A0A0A] hover:bg-[#1A1AFF] dark:hover:bg-[#1A1AFF] dark:hover:text-white rounded-[3px] font-mono text-[13px] px-5 py-2 transition-colors duration-200">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="flex size-10 items-center justify-center md:hidden p-0 mr-4 sm:mr-6"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t bg-background md:hidden">
            <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
              <NavMenuItems />
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-base text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Link href="/contact" className="w-full">
                <Button className="w-full h-12 bg-[#0A0A0A] dark:bg-[#F7F6F3] text-white dark:text-[#0A0A0A] hover:bg-[#1A1AFF] dark:hover:bg-[#1A1AFF] dark:hover:text-white rounded-[3px] font-mono text-[13px] transition-colors duration-200">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
