import React, { useState } from "react";
import { addRecord } from "../api/mockApi";
import FormInput from "../components/FormInput";

export default function DataEntry() {
  const [formData, setFormData] = useState({
    forest_station: "",
    officer_name: "",
    activity_type: "",
    activity_date: "",
    species: "",
    quantity: "",
    permit_number: "",
    remarks: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await addRecord(formData);
      if (res.status === "success") {
        setStatus(`✅ Record saved! Blockchain Tx: ${res.data.txHash}`);
      } else {
        setStatus(`❌ ${res.message}`);
      }
    } catch (err) {
      setStatus(`⚠️ Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submit Forestry Activity</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {Object.keys(formData).map((key) => (
          <FormInput
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded"
          disabled={status === "Submitting..."}
        >
          Submit to Blockchain
        </button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
