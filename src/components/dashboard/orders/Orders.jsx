import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../DashboardLayout";
import {
  getAllOrders,
  getAllUserOrders,
} from "../../../store/reducers/orderSlice";
import { MoreVertical } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    if (user && user.userType == "Admin") {
      dispatch(getAllOrders());
    } else {
      dispatch(getAllUserOrders(user.email));
    }
  }, [user, dispatch]);

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleDownload = (orderNo) => {
    window.open(`${API_URL}/api/orders/download/${orderNo}`, "_blank");
  };

  return (
    <DashboardLayout>
      <div className="text-3xl font-bold mb-8 text-gray-800">All Orders</div>

      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-6">
        {orders &&
          orders.orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="flex items-start justify-between p-5 relative">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {order.albumName}
                  </h3>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-gray-700 text-sm">
                    <p>
                      <span className="font-medium">Order No:</span>{" "}
                      {order.orderNo}
                    </p>
                    <p>
                      <span className="font-medium">Paper:</span>{" "}
                      {order.paperType} |{" "}
                      <span className="font-medium">Size:</span>{" "}
                      {order.albumSize}
                    </p>
                    <p>
                      <span className="font-medium">Bag:</span> {order.bagType}
                    </p>
                    <p>
                      <span className="font-medium">Delivery:</span>{" "}
                      {order.deliveryOption || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    {order.deliveryDate && (
                      <p>
                        <span className="font-medium">Delivery Date:</span>{" "}
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </p>
                    )}
                    {order.notes && (
                      <p className="col-span-2">
                        <span className="font-medium">Notes:</span>{" "}
                        {order.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Menu Button */}
                <div className="relative ml-4">
                  <button
                    onClick={() => toggleMenu(order._id)}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {menuOpen === order._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-20">
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        View
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Edit
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Button */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => handleDownload(order.orderNo)}
                  className="w-7xl py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition"
                >
                  Download Files
                </button>
              </div>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
}
