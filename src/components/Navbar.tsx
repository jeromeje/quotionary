
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonCustom } from "./ui/button-custom";
import { FileText, Plus } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled
          ? "py-3 bg-white/90 shadow-sm"
          : "py-5 bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium text-foreground">
              Quotation<span className="text-primary">App</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={isActive("/")}>
              Dashboard
            </NavLink>
            <NavLink to="/quotations" active={isActive("/quotations")}>
              Quotations
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <ButtonCustom asChild variant="premium" size="sm" className="group">
              <Link to="/create">
                <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                <span>New Quotation</span>
              </Link>
            </ButtonCustom>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative py-2 transition-colors duration-300",
        active ? "text-primary font-medium" : "text-foreground hover:text-primary"
      )}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navbar-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
