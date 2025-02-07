"use client";
import { client } from "@/sanity/lib/client";
import { UserData } from "@/types/componentTypes";
import React, { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react"; // Icons for Delete & Edit

const fetchCustomers = async (): Promise<UserData[]> => {
  const customers = await client.fetch(
    `*[_type == "user"]{
      _id,
      userId,
      name,
      email,
      phoneNumber,
      countryCode,
      address,
      country,
      zipCode,
      state,
      city,
      orders[] {
        orderId
      }
    }`
  );
  return customers;
};

// Function to Delete Customer
const deleteCustomer = async (id: string) => {
  try {
    await client.delete(id);
    alert("Customer deleted successfully!");
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};

// Function to Update Customer
const updateCustomer = async (id: string, updatedData: Partial<UserData>) => {
  try {
    await client.patch(id).set(updatedData).commit();
    alert("Customer updated successfully!");
  } catch (error) {
    console.error("Error updating customer:", error);
  }
};

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<UserData | null>(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const allCustomers = await fetchCustomers();
        setCustomers(allCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteCustomer(id);
    setCustomers(customers.filter((customer) => customer.userId !== id));
  };

  const handleEdit = (customer: UserData) => {
    setEditingCustomer(customer);
  };

  const handleUpdate = async () => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer.userId, {
        name: editingCustomer.name,
        phoneNumber: editingCustomer.phoneNumber,
      });
      setEditingCustomer(null);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-darkPrimary text-white p-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg bg-lightGray text-darkPrimary placeholder-gray-800 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div className="grid grid-cols-6 font-bold text-lg py-3 border-b border-gray-700 text-center font-satoshiBold">
        <p>Name</p>
        <p>Phone</p>
        <p>Email</p>
        <p>Orders</p>
        <p>Address</p>
        <p>Actions</p>
      </div>
      <div className="mt-4">
        {loading ? (
          <p className="text-center">Loading customers...</p>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center text-white">No customers found</div>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.userId}
              className="grid grid-cols-6 items-center py-4 border-b border-gray-700 text-center"
            >
              <p className="font-semibold font-satoshi">{customer.name}</p>
              <p className="text-gray-400 text-sm font-satoshi">
                {customer.phoneNumber}
              </p>
              <p className="text-white font-bold font-satoshi">
                {customer.email}
              </p>
              <p className="text-gray-400 text-sm font-satoshi">
                {customer.order?.length || 0}
              </p>
              <p className="text-gray-400 text-sm font-satoshi">
                {`${customer.address}, ${customer.city}, ${customer.country}`}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(customer)}
                  className="text-yellow-400 hover:text-yellow-500"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(customer.userId)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Update Modal */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-darkPrimary p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold text-white mb-4">Edit Customer</h2>
            <label className="block text-white">Name:</label>
            <input
              type="text"
              value={editingCustomer.name}
              onChange={(e) =>
                setEditingCustomer({ ...editingCustomer, name: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            />
            <label className="block text-white">Phone:</label>
            <input
              type="text"
              value={editingCustomer.phoneNumber}
              onChange={(e) =>
                setEditingCustomer({
                  ...editingCustomer,
                  phoneNumber: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingCustomer(null)}
                className="bg-gray-500 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 px-4 py-2 rounded text-black"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
