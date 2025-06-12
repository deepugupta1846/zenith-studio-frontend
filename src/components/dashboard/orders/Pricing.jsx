import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dialog } from "@headlessui/react";
import * as Yup from "yup";
import axios from "axios";
import DashboardLayout from "../DashboardLayout";

const API_URL = import.meta.env.VITE_API_URL;

const pricingSchema = Yup.object().shape({
  albumType: Yup.string().required("Required"),
  userType: Yup.string().required("Required"),
  glossyPaperPrice: Yup.number().required("Required").min(0),
  ntrPaperPrice: Yup.number().required("Required").min(0),
  bindingPrice: Yup.number().required("Required").min(0),
});

export default function Pricing() {
  const [prices, setPrices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchPrices = async () => {
    const res = await axios.get(`${API_URL}/api/prices`);
    setPrices(res.data);
  };

  const handleCreate = async (values, actions) => {
    try {
      await axios.post(`${API_URL}/api/prices`, values);
      setIsOpen(false);
      fetchPrices();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <DashboardLayout>
    <div className="p-6">
      <div className="flex justify-between  mb-6">
        <h2 className="text-2xl font-bold">Pricing Management</h2>
        <button
          onClick={() => setIsOpen(true)}
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
            <h3 className="text-lg font-semibold text-gray-800">{price.albumType}</h3>
            <p className="text-sm text-gray-500">User: {price.userType}</p>
            <p className="text-sm">Glossy Paper: ₹{price.glossyPaperPrice}</p>
            <p className="text-sm">NTR Paper: ₹{price.ntrPaperPrice}</p>
            <p className="text-sm">Binding: ₹{price.bindingPrice}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-full max-w-lg">
            <Dialog.Title className="text-xl font-semibold mb-4">Create Pricing</Dialog.Title>

            <Formik
              initialValues={{
                albumType: "",
                userType: "",
                glossyPaperPrice: 0,
                ntrPaperPrice: 0,
                bindingPrice: 0,
              }}
              validationSchema={pricingSchema}
              onSubmit={handleCreate}
            >
              <Form className="space-y-4">
                <div>
                  <label>Album Type</label>
                  <Field as="select" name="albumType" className="input">
                    <option value="">Select</option>
                    <option value="Print only">Print only</option>
                    <option value="Design only">Design only</option>
                    <option value="Print and design both">Print and design both</option>
                  </Field>
                  <ErrorMessage name="albumType" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label>User Type</label>
                  <Field as="select" name="userType" className="input">
                    <option value="">Select</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="retailer">Retailer</option>
                    <option value="Professional">Professional</option>
                  </Field>
                  <ErrorMessage name="userType" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label>Glossy Paper Price</label>
                  <Field type="number" name="glossyPaperPrice" className="input" />
                  <ErrorMessage name="glossyPaperPrice" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label>NTR Paper Price</label>
                  <Field type="number" name="ntrPaperPrice" className="input" />
                  <ErrorMessage name="ntrPaperPrice" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label>Binding Price</label>
                  <Field type="number" name="bindingPrice" className="input" />
                  <ErrorMessage name="bindingPrice" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 rounded bg-red-600 text-white">
                    Submit
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
