"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathName = usePathname();
  const isActive = (href: string) => pathName === href;
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <nav
      className={`bg-gray-900/50 md:bg-gray-900/80 backdrop-blur-lg md:backdrop-blur-2xl z-10 fixed md:h-[70px] ${
        isMenuOpen ? "h-full" : "h-[70px] bg-gray-900/50"
      } transition-all duration-300 w-full z-40 top-0 start-0`}
    >
      <div
        className={`max-w-screen-xl ${
          isMenuOpen ? "" : "h-[70px]"
        } flex flex-wrap items-center md:h-[70px] justify-between mx-auto xl:px-0 p-4`}
      >
        <Link
          onClick={() => (isMenuOpen ? toggleMenu() : null)}
          id="logo"
          href="/"
          className="flex items-center"
        >
          {/* Logo */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            SaveTikX
          </span>
        </Link>
        <div className="flex md:hidden">
          <Button
            type="button"
            variant={"default"}
            size={"icon"}
            className="inline-flex items-center justify-center text-sm text-gray-200 rounded-md md:hidden transition-colors duration-300 border-gray-700 border hover:bg-gray-700/80"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <Plus className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </Button>
        </div>
        <div
          className={`items-center md:opacity-100 md:right-0 transition-all duration-300 relative justify-between ${
            isMenuOpen ? "right-0 opacity-100" : "right-[110%] opacity-0"
          } w-full md:flex md:w-auto`}
        >
          <ul
            onClick={() => (isMenuOpen ? toggleMenu() : null)}
            id="nav-wrapper"
            className={`flex flex-col ${
              isMenuOpen ? "bg-gray-900" : "bg-transparent"
            } p-3 md:p-0 mt-4 gap-1 md:bg-transparent font-medium border rounded-md  md:gap-1 lg:gap-8 md:flex-row md:items-center md:mt-0 md:border-0 border-gray-700`}
          >
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 transition-all duration-300 border md:border-none ${
                  isActive("/") ? "text-purple-200" : "text-white"
                } hover:text-purple-500 rounded border-gray-700`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 transition-all duration-300 border md:border-none ${
                  isActive("/about") ? "text-purple-200" : "text-white"
                } hover:text-purple-500 rounded border-gray-700`}
              >
                About
              </Link>
            </li>
            <li className="md:hidden block">
              <hr className="border-t-2 my-1 border-dashed border-gray-600" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
