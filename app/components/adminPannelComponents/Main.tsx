"use client";
import { client } from "@/sanity/lib/client";
import { Order, UserData } from "@/types/componentTypes";
import { groq } from "next-sanity";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import {
  HiCurrencyRupee,
  HiOutlineShoppingBag,
  HiUsers,
  HiOutlineStar,
} from "react-icons/hi2";
import KPIsCard from "./KPIsCard";
import SalesChart from "./SalesChart";
import BarChart from "./BarsChart";
import CalendarComponent from "./Calendar";
import DashboardProfile from "./Profile";
import ProductDashboard from "./DashboardProducts";
import CustomerDashboard from "./DashboardCustomer";
import OrdersDashboard from "./DashboardOrders";
import DashBoardSideBar from "./DashBoardSideBar";
import Cookies from "js-cookie";
import { Moon, Sun, Bell, Search, User, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

const categories = ["Orders", "Users", "Products", "Analytics", "Settings"];

const userQuery = groq`*[_type == "user"] { _id, name, email }`;
const orderQuery = groq`*[_type == "order"] { _id, orderId, orderDate, status, orderData[{
order
}] }`;
const topSellingQuery = groq`*[_type == "topSelling"] { _id, name }`;
// const salesQuery = groq`*[_type == "salesData"] { _id, salesAmount, salesDate }`;


export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mostPopularProduct, setMostPopularProduct] = useState("Loading...");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const usersData: UserData[] = await client.fetch(userQuery);
      const ordersData: Order[] = await client.fetch(orderQuery);
      const topSellingData = await client.fetch(topSellingQuery);
      setUsers(usersData);
      setOrders(ordersData);
      if (topSellingData.length > 0) {
        setMostPopularProduct(topSellingData.length.toString());
      } else {
        setMostPopularProduct("0");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("adminUsername");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);
  const totalSales = orders.reduce((acc, order) => acc + 200, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const monthlySalesData = [
    { date: "Feb", salesAmount: 22 },
    { date: "Mar", salesAmount: 30 },
    { date: "Apr", salesAmount: 25 },
    { date: "May", salesAmount: 40 },
    { date: "Jun", salesAmount: 35 },
    { date: "Jul", salesAmount: 50 },
  ];
  const totalReviews = "50";
  const [showWelcome, setShowWelcome] = useState(true);
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(["New Order Received", "User Signed Up", "Stock Low"]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowWelcome(false), 3000);
  }, []);

  const productSalesData = [
    { product: "Product One", salesAmount: 22 },
    { product: "Product Two", salesAmount: 35 },
  ];
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="loader"></div>
          <p className="mt-4 text-white text-lg font-semibold">
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
    {showWelcome && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-darkPrimary flex justify-center font-clash items-center text-white text-3xl font-bold z-50"
        >
         Dear {username} - Welcome to Avion Admin Panel
        </motion.div>
      )}


      <div className="border-t-2 border-b-2 border-yellow-500">
      <header className="flex justify-between items-center p-4 bg-darkPrimary text-white shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Category Dropdown */}
        <select className="bg-gray-800 text-white p-2 rounded">
          <option>Select Category</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={24} />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white p-2 rounded shadow-lg">
                {notifications.length > 0 ? (
                  notifications.map((note, index) => (
                    <p key={index} className="border-b border-gray-700 p-2">{note}</p>
                  ))
                ) : (
                  <p className="p-2">No new notifications</p>
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setShowProfile(!showProfile)}>
              <User size={24} />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white p-2 rounded shadow-lg">
                <Link href="/profile" className="block p-2 hover:bg-gray-700 flex items-center gap-2">
                  <User size={16} /> Profile
                </Link>
                <Link href="/settings" className="block p-2 hover:bg-gray-700 flex items-center gap-2">
                  <Settings size={16} /> Settings
                </Link>
                <button className="w-full text-left p-2 hover:bg-gray-700 flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      </div>
    <div className="flex min-h-screen">
      <aside className="w-64">
        <DashBoardSideBar setActiveTab={setActiveTab} />
      </aside>
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-extrabold font-clash tracking-wider mb-6">
              Analytics Dashboard
            </h1>
            <p className="text-darkPrimary text-lg mb-8">
            Dear <span className="text-lg font-bold border-b border-darkPrimary text-darkPrimary font-clash">{username} !</span> Welcome to Avion Furniture analytics dashboard.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPIsCard
                title="Total Sales"
                value={`₹${totalSales}`}
                icon={<HiCurrencyRupee className="text-[21px] text-white/80" />}
              />
              <KPIsCard
                title="Total Orders"
                value={totalOrders.toString()}
                icon={
                  <HiOutlineShoppingBag className="text-[21px] text-white/80" />
                }
              />
              <KPIsCard
                title="Total Users"
                value={totalUsers.toString()}
                icon={<HiUsers className="text-[21px] text-white/80" />}
              />
              <KPIsCard
                title="Reviews"
                value={`${totalReviews.toString()} || "50"`}
                icon={<HiOutlineStar className="text-[21px] text-white/80" />}
              />
            </div>
            <SalesChart salesData={monthlySalesData} />
            <BarChart data={productSalesData} />
          </div>
        )}
        {activeTab === "calendar" && (
          <div>
            <h1 className="text-3xl font-extrabold font-clash tracking-wider mb-6">
              Calendar
            </h1>
            <CalendarComponent />
          </div>
        )}
        {activeTab === "profile" && (
          <div>
            <h1 className="text-3xl font-extrabold font-clash tracking-wider mb-6">
              Profile
            </h1>
            <DashboardProfile />
          </div>
        )}
        {activeTab === "product" && (
          <div>
            <h1 className="text-3xl font-extrabold font-clash tracking-wider mb-6">
              Products
            </h1>
            <ProductDashboard />
          </div>
        )}
        {activeTab === "customers" && (
          <div>
            <h1 className="text-3xl font-extrabold font-clash tracking-wider mb-6">
              Customers
            </h1>
            <CustomerDashboard />
          </div>
        )}
        {activeTab === "orders" && (
          <div>
            <h1 className="text-3xl font-extrabold font-clash tracking-wider mb-6">
              Orders
            </h1>
            <OrdersDashboard />
          </div>
        )}
      </div>
    </div>
    </>
  );
}