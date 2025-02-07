"use client";
import { client } from "@/sanity/lib/client";
import React, { useEffect, useState } from "react";
interface OrderTypes {
  orderId: string;
  customerName: string;
  status: string;
  totalItems: number;
  totalQuantity: number;
  orderDate: string;
  totalAmount: number;
  shippingAddress: string;
}
const fetchOrders = async (): Promise<OrderTypes[]> => {
  const orders = await client.fetch(
    `*[_type == "order"]{
      orderId,
      customerName,
      status,
      totalItems,
      totalQuantity,
      orderDate,
      totalAmount,
      shippingAddress
    }`
  );
  return orders;
};
const ShipmentsDashboard = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"orderDate" | "totalAmount" | "status">(
    "orderDate"
  );
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const allOrders = await fetchOrders();
        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);
  const filteredOrders = orders.filter((order) =>
    order.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "orderDate") {
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    } else if (sortBy === "totalAmount") {
      return a.totalAmount - b.totalAmount;
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });
  return (
    <div className="bg-darkPrimary text-white p-6 mt-[4rem]">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search shipment by customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "orderDate" | "totalAmount" | "status")
          }
          className="p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="orderDate">Sort by Order Date</option>
          <option value="totalAmount">Sort by Total Amount</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
      <div className="grid grid-cols-7 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold">
        <p>Order ID</p>
        <p>Customer Name</p>
        <p>Status</p>
        <p>Total Items</p>
        <p>Total Quantity</p>
        <p>Order Date</p>
        <p>Total Amount</p>
      </div>
      <div className="mt-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-7 items-center py-4 border-b border-gray-700 text-center"
            >
              <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            </div>
          ))
        ) : sortedOrders.length === 0 ? (
          <div className="text-center text-white">No orders found</div>
        ) : (
          sortedOrders.map((order) => (
            <div
              key={order.orderId}
              className="grid grid-cols-7 items-center py-4 border-b border-gray-700 text-center"
            >
              <p className="font-semibold font-satoshi">{order.orderId}</p>
              <p className="text-gray-400 text-sm font-satoshi">
                {order.customerName}
              </p>
              <p
                className={`text-sm font-satoshi ${
                  order.status === "Pending"
                    ? "text-yellow-500"
                    : order.status === "Processing"
                      ? "text-blue-500"
                      : order.status === "Shipped"
                        ? "text-green-500"
                        : order.status === "Delivered"
                          ? "text-purple-500"
                          : "text-red-500"
                }`}
              >
                {order.status}
              </p>
              <p className="text-white font-bold font-satoshi">
                {order.totalItems}
              </p>
              <p className="text-gray-400 text-sm font-satoshi">
                {order.totalQuantity}
              </p>
              <p className="text-gray-400 text-sm font-satoshi">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-white font-bold font-satoshi">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShipmentsDashboard;
