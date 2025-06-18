import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPrice,
  createPrice,
  updatePrice,
} from "../../../store/reducers/priceSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dialog } from "@headlessui/react";
import * as Yup from "yup";
import axios from "axios";
import DashboardLayout from "../DashboardLayout";
import { showAlert } from "../../../enum/SweetAlert";

const API_URL = import.meta.env.VITE_API_URL;

const pricingSchema = Yup.object().shape({
  albumType: Yup.string().required("Required"),
  userType: Yup.string().required("Required"),
  glossyPaperPrice: Yup.number().required("Required").min(0),
  ntrPaperPrice: Yup.number().required("Required").min(0),
  bindingPrice: Yup.number().required("Required").min(0),
});

export default function Pricing() {
  const dispatch = useDispatch();
  const { prices, loading, error } = useSelector((state) => state.price);
  // const [prices, setPrices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    dispatch(getAllPrice());
  }, [dispatch]);

  const handleCreate = async (values) => {
    try {
      if (isEditing) {
        const response = await dispatch(
          updatePrice({ priceData: values, priceId: isEditing })
        );
        if (updatePrice.fulfilled.match(response)) {
          showAlert({
            title: "Price Updated",
            subtitle: "Price has been successfully update",
            confirmText: "Ok",
          }).then(async () => {
            await dispatch(getAllPrice());
          });
        }

        if (updatePrice.rejected.match(response)) {
          await showAlert({
            type: "error",
            title: "Something wenty wrong",
            subtitle: response,
            confirmText: "Ok",
          });
        }
      } else {
        let res = await dispatch(createPrice(values));
        if (createPrice.fulfilled.match(res)) {
          showAlert({
            title: "Price Added",
            subtitle: "Price has been added!",
            confirmText: "Ok",
          }).then(async () => {
            await dispatch(getAllPrice());
          });
        }

        if (createPrice.rejected.match(res)) {
          await showAlert({
            type: "error",
            title: "Something wenty wrong",
            subtitle: res,
            confirmText: "Ok",
          });
        }
      }

      setIsOpen(false);
      setEditingData(null);
      setIsEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (price) => {
    setEditingData(price);
    setIsEditing(price._id);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    showAlert({
      title: "Are you sure ?",
      subtitle: "want to delete the selected price!",
      confirmText: "Ok",
      cancelText: "cancel",
    })
      .then(async () => {
        axios.delete(`${API_URL}/api/price/${id}`).then(() => {
          showAlert({
            title: "Deleted",
            subtitle: "Price deleted",
            confirmText: "Ok",
          }).then(async () => {
            await dispatch(getAllPrice());
          });
        });
      })
      .catch(() => {
        console.log("Oops! User canceld");
      });
  };

  return (
    <DashboardLayout>
      {loading && <p className="text-gray-600">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="p-6">
        <div className="flex justify-between  mb-6">
          <h2 className="text-2xl font-bold">Pricing Management</h2>
          <button
            onClick={() => {
              setIsOpen(true);
              setIsEditing(false);
              setEditingData(null);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
          >
            Create New Pricing
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prices.map((price) => (
            <div
              key={price._id}
              className="border rounded-xl shadow p-4 bg-white space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {price.albumType}
              </h3>
              <p className="text-sm text-gray-500">User: {price.userType}</p>
              <p className="text-sm">Glossy Paper: ₹{price.glossyPaperPrice}</p>
              <p className="text-sm">NTR Paper: ₹{price.ntrPaperPrice}</p>
              <p className="text-sm">Binding: ₹{price.bindingPrice}</p>

              <div className="flex justify-between items-center mt-2">
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => handleEditClick(price)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => handleDelete(price._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {/* <Dialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setIsEditing(false);
            setEditingData(null);
          }}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-lg">
              <Dialog.Title className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Pricing" : "Create Pricing"}
              </Dialog.Title>

              <Formik
                initialValues={
                  editingData || {
                    albumType: "",
                    userType: "",
                    glossyPaperPrice: 0,
                    ntrPaperPrice: 0,
                    bindingPrice: 0,
                  }
                }
                validationSchema={pricingSchema}
                onSubmit={handleCreate}
                enableReinitialize
              >
                <Form className="space-y-4">
                  <div>
                    <label>Album Type</label>
                    <Field as="select" name="albumType" className="input">
                      <option value="">Select</option>
                      <option value="Print only">Print only</option>
                      <option value="Print and design both">
                        Print and design both
                      </option>
                    </Field>
                    <ErrorMessage
                      name="albumType"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label>User Type</label>
                    <Field as="select" name="userType" className="input">
                      <option value="">Select</option>
                      <option value="user">User</option>
                      <option value="retailer">Retailer</option>
                      <option value="Professional">Professional</option>
                    </Field>
                    <ErrorMessage
                      name="userType"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label>Glossy Paper Price</label>
                    <Field
                      type="number"
                      name="glossyPaperPrice"
                      className="input"
                    />
                    <ErrorMessage
                      name="glossyPaperPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label>NTR Paper Price</label>
                    <Field
                      type="number"
                      name="ntrPaperPrice"
                      className="input"
                    />
                    <ErrorMessage
                      name="ntrPaperPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label>Binding Price</label>
                    <Field
                      type="number"
                      name="bindingPrice"
                      className="input"
                    />
                    <ErrorMessage
                      name="bindingPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setIsEditing(false);
                        setEditingData(null);
                      }}
                      className="px-4 py-2 rounded bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-red-600 text-white"
                    >
                      {isEditing ? "Update" : "Submit"}
                    </button>
                  </div>
                </Form>
              </Formik>
            </Dialog.Panel>
          </div>
        </Dialog> */}
        <Dialog
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setIsEditing(false);
            setEditingData(null);
          }}
          className="relative z-50"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Centered Panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
            <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <Dialog.Title className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {isEditing ? "Edit Pricing" : "Create Pricing"}
              </Dialog.Title>

              <Formik
                initialValues={
                  editingData || {
                    albumType: "",
                    userType: "",
                    glossyPaperPrice: 0,
                    ntrPaperPrice: 0,
                    bindingPrice: 0,
                  }
                }
                validationSchema={pricingSchema}
                onSubmit={handleCreate}
                enableReinitialize
              >
                <Form className="space-y-4">
                  {[
                    {
                      label: "Album Type",
                      name: "albumType",
                      type: "select",
                      options: ["Print only", "Print and design both"],
                    },
                    {
                      label: "User Type",
                      name: "userType",
                      type: "select",
                      options: ["user", "retailer", "Professional"],
                    },
                    {
                      label: "Glossy Paper Price",
                      name: "glossyPaperPrice",
                      type: "number",
                    },
                    {
                      label: "NTR Paper Price",
                      name: "ntrPaperPrice",
                      type: "number",
                    },
                    {
                      label: "Binding Price",
                      name: "bindingPrice",
                      type: "number",
                    },
                  ].map(({ label, name, type, options }) => (
                    <div key={name} className="flex flex-col gap-1">
                      <label
                        htmlFor={name}
                        className="text-sm font-medium text-gray-700"
                      >
                        {label}
                      </label>
                      {type === "select" ? (
                        <Field
                          as="select"
                          name={name}
                          className="input input-bordered w-full"
                        >
                          <option value="">Select</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          type={type}
                          name={name}
                          className="input input-bordered w-full"
                        />
                      )}
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  ))}

                  {/* Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setIsEditing(false);
                        setEditingData(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm"
                    >
                      {isEditing ? "Update" : "Submit"}
                    </button>
                  </div>
                </Form>
              </Formik>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
