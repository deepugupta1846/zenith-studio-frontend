import { useState } from "react";
import Corprate from "../Corprate";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const statusSteps = ["Pending", "Process", "Complete", "Delivered"];

export default function CheckOrderStatus() {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrderStatus = async () => {
    if (!orderId.trim()) return;
    setLoading(true);

    try {
      // Dummy status response for demonstration
      const dummyStatuses = ["Pending", "Process", "Complete", "Delivered"];
      const randomStatus = dummyStatuses[Math.floor(Math.random() * dummyStatuses.length)];
      // Simulate network request delay
      setTimeout(() => {
        setCurrentStatus(randomStatus);
        setLoading(false);
      }, 1000);

      // Example with real API:
      // const res = await fetch(`http://localhost:5000/api/orders/status/${orderId}`);
      // const data = await res.json();
      // setCurrentStatus(data.status);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getStatusIndex = () => statusSteps.findIndex((s) => s === currentStatus);

  return (
    <Corprate>
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 py-20">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-brand">Check Your Order Status</h2>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Order ID"
              className="input input-bordered w-full"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button
              onClick={getOrderStatus}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Checking..." : "Submit"}
            </button>
          </div>

          {currentStatus && (
            <div className="pt-8">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">Order Progress</h3>
              <div className="flex justify-between items-center relative">
                {statusSteps.map((step, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index <= getStatusIndex() ? "bg-red-500" : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p
                      className={`mt-2 text-sm ${
                        index <= getStatusIndex() ? "text-red-500 font-medium" : "text-gray-400"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                ))}

                {/* Progress Line */}
                <motion.div
                  className="absolute top-4 left-4 right-4 h-1 bg-gray-300 z-0 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(getStatusIndex() / (statusSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: "linear-gradient(to right, #ce181e, #f97316)",
                    height: "4px",
                  }}
                />
              </div>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">Current Status:</span>
                <p className="text-xl font-semibold text-brand">{currentStatus}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Corprate>
  );
}
