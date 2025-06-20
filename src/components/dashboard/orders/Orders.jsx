import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DashboardLayout from "../DashboardLayout";
import {
  getAllOrders,
  getAllUserOrders,
} from "../../../store/reducers/orderSlice";
import { MoreVertical } from "lucide-react";
import { getAllPrice } from "../../../store/reducers/priceSlice";
import { State, City } from "country-state-city";
const API_URL = import.meta.env.VITE_API_URL;

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [defaultOrderNo, setDefaultOrderNo] = useState("");

  useEffect(() => {
    dispatch(getAllPrice());
    if (user && user.userType == "Admin") {
      dispatch(getAllOrders());
    } else {
      dispatch(getAllUserOrders(user.email));
    }
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
    setDefaultOrderNo(generateOrderNumber());
  }, [user, dispatch]);

  const handleFileUpload = (e, setFieldValue, values) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setFieldValue("albumFiles", imageFiles);
    setImagePreviews(imageFiles.map((file) => URL.createObjectURL(file)));

    // make dynamic price
    const matchingPrice = pricing.find(
      (p) => p.albumType === values.designPrint // You can update this based on logged-in user role
    );
    if (!matchingPrice) {
      console.log("No matching pricing found");
      return;
    }
    const baseRate =
      values.paperType === "Glossy"
        ? matchingPrice.glossyPaperPrice
        : matchingPrice.ntrPaperPrice;
    const fixedCost = matchingPrice.bindingPrice;
    const gstRate = 0.18;
    const quantity = imageFiles.length;

    const subtotal = baseRate * quantity + fixedCost;
    const gst = subtotal * gstRate;
    const total = subtotal + gst;

    setPricing({ baseRate, quantity, fixedCost, subtotal, gst, total });
  };

  const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

  const handleDownload = (orderNo) => {
    window.open(`${API_URL}/api/orders/download/${orderNo}`, "_blank");
  };
  const handleStateChange = (value, setFieldValue) => {
    setFieldValue("stateCode", value);
    const stateObj = states.find((s) => s.isoCode === value);
    if (stateObj) {
      setFieldValue("state", stateObj.name);
      setDistricts(City.getCitiesOfState("IN", value));
    }
    setFieldValue("district", "");
  };
  return (
    <DashboardLayout>
      <div className="text-3xl font-bold mb-8 text-gray-800">All Orders</div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Create Order
      </button>

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

      {/* crete model */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-5xl max-h-[95vh] overflow-y-auto relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Create New Order
            </h2>

            <Formik
              initialValues={{
                albumName: "",
                paperType: "",
                albumSize: "",
                designPrint: "",
                bagType: "",
                deliveryOption: "Counter",
                address: "",
                stateCode: "",
                state: "",
                district: "",
                landmark: "",
                pincode: "",
                orderDate: new Date().toISOString().split("T")[0],
                deliveryDate: new Date(Date.now() + 3 * 86400000)
                  .toISOString()
                  .split("T")[0],
                albumFiles: [],
                orderNo: defaultOrderNo,
                notes: "",
                email: "",
                mobileNumber: "",
              }}
              validationSchema={Yup.object({
                albumName: Yup.string().required("Album Name is required"),
                paperType: Yup.string().required("Paper Type is required"),
                albumSize: Yup.string().required("Album Size is required"),
                email: Yup.string()
                  .email("Invalid email")
                  .required("Email required"),
                mobileNumber: Yup.string().required("Mobile required"),
                designPrint: Yup.string().required("Design/Print is required"),
              })}
              onSubmit={async (values, { resetForm }) => {
                const form = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                  if (key === "albumFiles") {
                    value.forEach((file) => form.append("albumFiles", file));
                  } else {
                    form.append(key, value);
                  }
                });

                try {
                  const res = await fetch(`${API_URL}/api/orders`, {
                    method: "POST",
                    body: form,
                  });
                  if (!res.ok) throw new Error("Order creation failed");
                  alert("Order submitted!");
                  resetForm();
                  setShowCreateModal(false);
                } catch (err) {
                  console.error(err);
                  alert("Failed to submit order");
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Album Name</label>
                      <Field
                        name="albumName"
                        className="input input-bordered w-full"
                      />
                      <ErrorMessage
                        name="albumName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="label">Paper Type</label>
                      <Field
                        as="select"
                        name="paperType"
                        className="select select-bordered w-full"
                      >
                        <option value="">Select</option>
                        <option>Glossy</option>
                        <option>NTR</option>
                      </Field>
                    </div>

                    <div>
                      <label className="label">Album Size</label>
                      <Field
                        as="select"
                        name="albumSize"
                        className="select select-bordered w-full"
                      >
                        <option value="">Select</option>
                        <option>A4</option>
                        <option>4X6</option>
                        <option>12X36</option>
                      </Field>
                    </div>

                    <div>
                      <label className="label">Print & Design</label>
                      <Field
                        as="select"
                        name="designPrint"
                        className="select select-bordered w-full"
                      >
                        <option value="">Select</option>
                        <option>Print</option>
                        <option>Print and Design</option>
                      </Field>
                      <ErrorMessage
                        name="designPrint"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="label">Bag Type</label>
                      <Field
                        as="select"
                        name="bagType"
                        className="select select-bordered w-full"
                      >
                        <option>Normal Bag</option>
                        <option>Photo Bag</option>
                      </Field>
                    </div>

                    <div>
                      <label className="label">Delivery Option</label>
                      <Field
                        as="select"
                        name="deliveryOption"
                        className="select select-bordered w-full"
                      >
                        <option value="Bus">Bus</option>
                        <option value="Counter">Counter</option>
                        <option value="By Hand">By Hand</option>
                      </Field>
                    </div>

                    {values.deliveryOption === "Bus" && (
                      <>
                        <div className="md:col-span-2">
                          <label className="label">Full Address</label>
                          <Field
                            as="textarea"
                            name="address"
                            className="textarea textarea-bordered w-full"
                            rows="3"
                          />
                        </div>

                        <div>
                          <label className="label">State</label>
                          <select
                            name="stateCode"
                            className="select select-bordered w-full"
                            onChange={(e) =>
                              handleStateChange(e.target.value, setFieldValue)
                            }
                            value={values.stateCode}
                          >
                            <option value="">Select State</option>
                            {states.map((s) => (
                              <option key={s.isoCode} value={s.isoCode}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="label">District</label>
                          <Field
                            as="select"
                            name="district"
                            className="select select-bordered w-full"
                          >
                            <option value="">Select District</option>
                            {districts.map((d, i) => (
                              <option key={i} value={d.name}>
                                {d.name}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div>
                          <label className="label">Landmark</label>
                          <Field
                            name="landmark"
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div>
                          <label className="label">Pincode</label>
                          <Field
                            name="pincode"
                            className="input input-bordered w-full"
                          />
                        </div>
                      </>
                    )}

                    <div className="col-span-2">
                      <label className="label">
                        Upload Album Files (Folder)
                      </label>
                      <input
                        type="file"
                        webkitdirectory="true"
                        multiple
                        className="file-input file-input-bordered w-full"
                        onChange={(e) =>
                          handleFileUpload(e, setFieldValue, values)
                        }
                      />
                    </div>
                    {imagePreviews.length > 0 && (
                      <div className="md:col-span-2">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm mb-4"
                          onClick={() => setShowCreateModal(true)}
                        >
                          Preview Images
                        </button>
                      </div>
                    )}

                    <div>
                      <label className="label">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="input input-bordered w-full"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Order Date</label>
                        <Field
                          type="date"
                          name="orderDate"
                          className="input input-bordered w-full"
                        />
                      </div>

                      <div>
                        <label className="label">Delivery Date</label>
                        <Field
                          type="date"
                          name="deliveryDate"
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label">Mobile Number</label>
                      <Field
                        name="mobileNumber"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary px-10">
                      Submit Order
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
