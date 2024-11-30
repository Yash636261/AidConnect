import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
}

interface NavLinks {
  label: string;
  href: string;
}

function NavItem({ href, isActive, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
}

export function Nav({ links = [] }: { links: NavLinks[] }) {
  return (
    <nav className="flex items-center space-x-4  bg-gray-100 dark:bg-neutral-800">
      {links.map((link, idx) => (
        <NavItem key={idx} href={link.href} isActive={false}>
          {link.label}
        </NavItem>
      ))}
    </nav>
  );
}
