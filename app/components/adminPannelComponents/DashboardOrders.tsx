"use client";
import { client } from "@/sanity/lib/client";
import { Order } from "@/types/componentTypes";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Trash2, Edit } from "lucide-react"; // Importing icons

const fetchOrders = async (): Promise<Order[]> => {
  const orders = await client.fetch(
    `*[_type == "order"]{
      _id,
      orderId,
      userId,
      orderDate,
      orderData[] {
        productId,
        productName,
        quantity,
        totalAmount,
        originalPrice
      }
    }`
  );
  return orders;
};

// Function to delete an order from Sanity
const deleteOrder = async (
  orderId: string,
  _id: string,
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
) => {
  try {
    await client.delete(_id);
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
    toast.success("Order deleted successfully!");
  } catch (error) {
    console.error("Error deleting order:", error);
    toast.error("Failed to delete order.");
  }
};


// Function to update order status in Sanity
const updateOrderStatus = async (
  _id: string,
  newStatus: string,
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
) => {
  try {
    await client.patch(_id).set({ status: newStatus }).commit();
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === _id ? { ...order, status: newStatus } : order
      )
    );
    toast.success("Order status updated successfully!");
  } catch (error) {
    console.error("Error updating order status:", error);
    toast.error("Failed to update order status.");
  }
};

const OrdersDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"orderDate" | "totalAmount" | "orderId">(
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
    order.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const status = "Delivered"

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "orderDate") {
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    } else if (sortBy === "totalAmount") {
      const totalA = a.orderData.reduce((acc, item) => acc + item.totalAmount, 0);
      const totalB = b.orderData.reduce((acc, item) => acc + item.totalAmount, 0);
      return totalA - totalB;
    } else if (sortBy === "orderId") {
      const numA = parseInt(a.orderId.replace(/\D/g, ""), 10);
      const numB = parseInt(b.orderId.replace(/\D/g, ""), 10);
      return numA - numB;
    }
    return 0;
  });

  return (
    <div className="bg-black text-white p-6">
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search orders by order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "orderDate" | "totalAmount" | "orderId")
          }
          className="p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="orderDate">Sort by Order Date</option>
          <option value="totalAmount">Sort by Total Amount</option>
          <option value="orderId">Sort by Order ID</option>
        </select>
      </div>

      <div className="grid grid-cols-9 font-bold text-lg py-3 border-b border-gray-700 text-center">
        <p>Order ID</p>
        <p>User ID</p>
        <p>Status</p>
        <p className="pl-4">Order Date</p>
        <p className="pl-4">Total Quantity</p>
        <p className="pl-4">Total Amount</p>
        <p className="pl-4">Products Id</p>
        <p className="pl-4">Actions</p>
      </div>

      <div className="mt-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : sortedOrders.length === 0 ? (
          <div className="text-center text-white">No orders found</div>
        ) : (
          sortedOrders.map((order) => (
            <div
              key={order.orderId}
              className="grid grid-cols-9 items-center py-4 border-b border-gray-700 text-center"
            >
              <p className="text-gray-400 text-sm">{order.orderId}</p>
              <p className="text-gray-400 text-sm">{order.userId}</p>
              <p className="text-gray-400 text-sm">{`${status}`}</p>
              <p className="text-gray-400 text-sm">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm">
                {order.orderData.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <p className="text-gray-400 text-sm">
                ${order.orderData.reduce((acc, item) => acc + item.totalAmount, 0).toFixed(2)}
              </p>
              <p className="text-gray-400 text-sm">
                {order.orderData.map((item) => item.productId).join(", ")}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => deleteOrder(order.orderId, order._id, setOrders)}
                  className="bg-red-600 p-2 rounded hover:bg-red-800"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => updateOrderStatus(order._id, "Shipped", setOrders)}
                  className="bg-blue-600 p-2 rounded hover:bg-blue-800"
                >
                  <Edit size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
