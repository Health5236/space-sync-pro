
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building,
  Calendar,
  Users,
  UserPlus,
  CreditCard,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Building, label: "Spaces", href: "/spaces" },
  { icon: Calendar, label: "Bookings", href: "/bookings" },
  { icon: Users, label: "Members", href: "/members" },
  { icon: UserPlus, label: "Leads", href: "/leads" },
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn("bg-white border-r border-gray-200 transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto block"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="px-2 pb-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm rounded-lg transition-colors",
                    "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
