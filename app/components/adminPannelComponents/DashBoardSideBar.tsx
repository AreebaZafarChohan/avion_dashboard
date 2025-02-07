"use client";
import React from "react";
import { BiHomeAlt, BiSolidShoppingBags } from "react-icons/bi";
import { MdInventory, MdOutlineCalendarToday, MdReviews } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import { IoIosLogOut, IoMdAnalytics } from "react-icons/io";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaShippingFast } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
interface DashBoardSideBarProps {
  setActiveTab: (tab: string) => void;
}
const DashBoardSideBar: React.FC<DashBoardSideBarProps> = ({
  setActiveTab,
}) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("authToken");
    router.push("/login");
  };
  return (
    <div className="">
      <div
        id="hs-sidebar-layout-splitter"
        className="hs-overlay [--auto-close:sm] sm:block sm:translate-x-0 sm:end-auto sm:bottom-0 w-64
hs-overlay-open:translate-x-0
-translate-x-full transition-all duration-300 transform
h-full
fixed top-0 start-0 bottom-0 z-[60]
bg-darkPrimary border-e border-gray-200 "
        role="dialog"
        aria-label="Sidebar"
      >
        <div
          className="relative flex h-full max-h-full pointer-events-none"
          data-hs-layout-splitter-horizontal-group
        >
          <div className="pointer-events-auto">
            <header className="p-4 flex justify-between items-center gap-x-2">
              <p
                className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80"
                aria-label="Brand"
              >
                Dashboard
              </p>
            </header>

            <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div
                className="hs-accordion-group pb-0 px-2 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open
              >
                <ul className="space-y-1">
                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm border border-transparent hover:border-yellow-500 text-white rounded-lg "
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <BiHomeAlt className="h-[20px] w-[20px] " />
                      Dashboard
                    </p>
                  </li>

                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("calendar")}
                    >
                      <MdOutlineCalendarToday className="h-[19px] w-[19px] text-white" />
                      Calendar
                    </p>
                  </li>

                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("profile")}
                    >
                      <FiUser className="h-[19px] w-[19px] " />
                      Profile
                    </p>
                  </li>

                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("product")}
                    >
                      <AiOutlineProduct className="h-[19px] w-[19px] text-white" />
                      Product
                    </p>
                  </li>

                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("customers")}
                    >
                      <PiUsersFourFill className="h-[19px] w-[19px] text-white" />
                      Customers
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("orders")}
                    >
                      <BiSolidShoppingBags  className="h-[19px] w-[19px] text-white" />
                      Orders
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("shipments")}
                    >
                      <FaShippingFast className="h-[19px] w-[19px] text-white" />
                      Shipments
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("analytics")}
                    >
                      <IoMdAnalytics className="h-[19px] w-[19px] text-white" />
                      Analytics
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("stock")}
                    >
                      <MdInventory  className="h-[19px] w-[19px] text-white" />
                      Stock
                    </p>
                  </li>
                  <li>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-white rounded-lg border border-transparent hover:border-yellow-500"
                      onClick={() => setActiveTab("reviews")}
                    >
                      <MdReviews  className="h-[19px] w-[19px] text-white" />
                      Reviews
                    </p>
                  </li>
                  <li onClick={handleLogout}>
                    <p
                      className="flex items-center gap-x-3 py-2 px-2.5 text-sm text-red-500 rounded-lg border border-transparent hover:border-yellow-500 mt-6"
                      onClick={() => setActiveTab("orders")}
                    >
                      <IoIosLogOut className="h-[19px] w-[19px] text-red-500" />
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
