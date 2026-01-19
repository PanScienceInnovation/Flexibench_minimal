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
  <NavigationMenu className={`${className ?? ""}`}>
    <NavigationMenuList className="flex flex-col gap-1 md:flex-row">
      <NavigationMenuItem>
        <Link href="/">
          <Button variant="ghost" className="w-full md:w-auto">
            Home
          </Button>
        </Link>
      </NavigationMenuItem>
      {MENU_ITEMS.map((item) => {
        if (item.dropdown) {
          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger className="w-full md:w-auto">
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-1 p-2 w-56">
                  {item.dropdown.map((dropdownItem) => (
                    <NavigationMenuLink key={dropdownItem.label} asChild>
                      <Link href={dropdownItem.href}>
                        <Button variant="ghost" className="w-full justify-start">
                          {dropdownItem.label}
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        }
        return (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href}>
              <Button variant="ghost" className="w-full md:w-auto">
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
    <nav className="bg-background sticky top-0 isolate z-50 border-b">
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
              <Button className="hover:scale-105 transition-transform duration-200">Get Started</Button>
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
                <Button className="w-full h-12 hover:scale-105 transition-transform duration-200">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
