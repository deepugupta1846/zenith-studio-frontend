import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Corprate from "../Corprate";
import { State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrice } from "../../store/reducers/priceSlice";
const API_URL = import.meta.env.VITE_API_URL;

export default function OrderPage() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pricing, setPricing] = useState({});
  const [defaultOrderNo, setDefaultOrderNo] = useState("");
  const dispatch = useDispatch();

  const { prices, loading, error } = useSelector((state) => state.price);

   useEffect(() => {
      dispatch(getAllPrice());
    }, [dispatch]);

  useEffect(() => {
    // fetch dynamic data
    // const fetchPricing = async () => {
    //   try {
    //     const res = await fetch(`${API_URL}/api/prices`);
    //     const data = await res.json();
    //     console.log(data);
    //     setPricing(data); // pricing will be an array
    //   } catch (error) {
    //     console.error("Failed to fetch pricing", error);
    //   }
    // };

    // fetchPricing();
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
    // setStates(State.getStatesOfCountry("IN"));
    setDefaultOrderNo(generateOrderNumber());
  }, []);

  const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

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
    // const baseRate = 80;
    // const fixedCost = 300;
    // const gstRate = 0.18;
    // const quantity = imageFiles.length;

    // const subtotal = baseRate * quantity + fixedCost;
    // const gst = subtotal * gstRate;
    // const total = subtotal + gst;

    // setPricing({ baseRate, quantity, fixedCost, subtotal, gst, total });
  };
  const getFormattedDate = (date) => date.toISOString().split("T")[0];

  const today = new Date();
  const delivery = new Date();
  delivery.setDate(today.getDate() + 3);

  const initialValues = {
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
    orderDate: getFormattedDate(today),
    deliveryDate: getFormattedDate(delivery),
    albumFiles: [],
    orderNo: defaultOrderNo,
    notes: "",
    email: "",
    mobileNumber: "",
  };

  const validationSchema = Yup.object({
    albumName: Yup.string().required("Album Name is required"),
    paperType: Yup.string().required("Paper Type is required"),
    albumSize: Yup.string().required("Album Size is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobileNumber: Yup.string().required("Mobile number is required"),
    designPrint: Yup.string().required("Please select a Print/Design option"),
  });

  const handleStateChange = (value, setFieldValue) => {
    setFieldValue("stateCode", value);
    const stateObj = states.find((s) => s.isoCode === value);
    if (stateObj) {
      setFieldValue("state", stateObj.name);
      setDistricts(City.getCitiesOfState("IN", value));
    }
    setFieldValue("district", "");
  };

  const handleSubmit = async (values) => {
    const form = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "albumFiles") {
        // value.forEach((file) => form.append("albumFiles", file));
      } else {
        form.append(key, value);
      }
    });
    Object.entries(values).forEach(([key, value]) => {
      if (key === "albumFiles") {
        value.forEach((file) => form.append("albumFiles", file));
      } else {
        // form.append(key, value);
      }
    });

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("Failed to submit order");
      const data = await res.json();
      if (data) {
        const res = await fetch(`${API_URL}${data.paymentRedirect}`, {
          method: "POST",
          body: JSON.stringify(data.suggestedPaymentDetails),
        });
        console.log(res);
      }
      alert("Order submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit order");
    }
  };

  return (
    <Corprate>
      <div className="max-w-5xl mx-auto p-4 mt-16">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand">
          Album Order Form
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
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
                  <label className="label">Select Paper Type</label>
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
                    <option value="Print">Print</option>
                    <option value="Print and Design">Print and Design</option>
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

                <div className="md:col-span-2">
                  <label className="label">Upload Album Folder (Max 2GB)</label>
                  <input
                    type="file"
                    multiple
                    webkitdirectory="true"
                    directory=""
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => handleFileUpload(e, setFieldValue, values)}
                  />
                </div>

                {imagePreviews.length > 0 && (
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm mb-4"
                      onClick={() => setShowModal(true)}
                    >
                      Preview Images
                    </button>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="label">Order Number</label>
                  <Field
                    name="orderNo"
                    className="input input-bordered w-full"
                    disabled
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">
                    Additional Notes / Upload Instructions
                  </label>
                  <Field
                    as="textarea"
                    name="notes"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                  />
                </div>

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

                <div>
                  <label className="label">Mobile Number</label>
                  <Field
                    name="mobileNumber"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {imagePreviews.length > 0 && pricing.total ? (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h3 className="text-lg font-semibold mb-2">
                    Pricing Breakdown
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li>
                      Base Price: ₹{pricing.baseRate} × {pricing.quantity} = ₹
                      {pricing.baseRate * pricing.quantity}
                    </li>
                    <li>
                      Fixed Charge (e.g. Bag/Handling): ₹{pricing.fixedCost}
                    </li>
                    <li className="font-medium">
                      Subtotal: ₹{pricing.subtotal}
                    </li>
                    <li>GST (18%): ₹{pricing.gst.toFixed(2)}</li>
                    <li className="font-bold text-brand">
                      Total Price: ₹{pricing.total.toFixed(2)}
                    </li>
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">Calculating price...</p>
              )}

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-10">
                  Submit Order
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white max-w-4xl w-full p-6 rounded shadow-lg overflow-y-auto max-h-[90vh] relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 btn btn-sm btn-circle"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Preview Album Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Corprate>
  );
}
