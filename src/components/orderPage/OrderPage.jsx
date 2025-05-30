import { useState } from "react";
import Corprate from "../Corprate";

export default function OrderPage() {
  const [formData, setFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    setFormData({ ...formData, albumFiles: imageFiles });

    const previewUrls = imageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "albumFiles") {
      value.forEach((file) => form.append("albumFiles", file));
    } else {
      form.append(key, value);
    }
  });

  try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error("Failed to submit order");
    const data = await res.json();
    console.log("Order created:", data);
    alert("Order submitted successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to submit order");
  }
};


  return (
    <Corprate>
    <div className="max-w-5xl mx-auto p-4 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-brand">Album Order Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Album Name</label>
            <input type="text" name="albumName" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="label">Select Paper Type</label>
            <select name="paperType" className="select select-bordered w-full" onChange={handleChange}>
              <option>Glossy</option>
              <option>NTR</option>
            </select>
          </div>

          <div>
            <label className="label">Album Size</label>
            <input type="text" name="albumSize" placeholder="e.g. 12x36" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="label">Point & Design</label>
            <input type="text" name="designPoint" className="input input-bordered w-full" onChange={handleChange} />
          </div>

          <div>
            <label className="label">Bag Type</label>
            <select name="bagType" className="select select-bordered w-full" onChange={handleChange}>
              <option>Normal</option>
              <option>3D Bag</option>
            </select>
          </div>
          <div>
            <label className="label">Delivery Option</label>
            <select name="deliveryOption" className="select select-bordered w-full" onChange={handleChange}>
              <option>Bus</option>
              <option>Counter</option>
              <option>By Hand</option>
            </select>
          </div>

          <div>
            <label className="label">Order Date</label>
            <input type="date" name="orderDate" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="label">Delivery Date</label>
            <input type="date" name="deliveryDate" className="input input-bordered w-full" onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <label className="label">Upload Album Folder (Max 2GB)</label>
            <input
              type="file"
              name="albumFiles"
              className="file-input file-input-bordered w-full"
              multiple
              webkitdirectory="true"
              directory=""
              onChange={handleFileUpload}
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="rounded overflow-hidden shadow">
                  <img src={src} alt={`preview-${index}`} className="object-cover w-full h-32" />
                </div>
              ))}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="label">Order Number</label>
            <input type="text" name="orderNo" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Additional Notes / Upload Instructions</label>
            <textarea name="notes" className="textarea textarea-bordered w-full" rows="4" onChange={handleChange}></textarea>
          </div>

           <div>
            <label className="label">Email</label>
            <input type="email" name="email" className="input input-bordered w-full" onChange={handleChange} />
          </div>
          <div>
            <label className="label">Mobile Number</label>
            <input type="number" name="mobileNumber" className="input input-bordered w-full" onChange={handleChange} />
          </div>

          
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-10">Submit Order</button>
        </div>
      </form>
    </div>
    </Corprate>
  );
}
