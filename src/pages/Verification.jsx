import React, { useState } from "react";
import { verifyPermit } from "../api/mockApi";

export default function Verification() {
  const [permitId, setPermitId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyPermit(permitId);
      setResult(res);
    } catch (err) {
      setResult({ status: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Permit Verification</h2>
      <form onSubmit={handleVerify} className="flex gap-2">
        <input
          type="text"
          value={permitId}
          onChange={(e) => setPermitId(e.target.value)}
          placeholder="Enter Permit ID"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Message:</strong> {result.message}</p>
          {result.data && (
            <>
              <p><strong>Station:</strong> {result.data.forest_station}</p>
              <p><strong>Officer:</strong> {result.data.officer_name}</p>
              <p><strong>TxHash:</strong> {result.data.txHash}</p>
              <p><strong>Verification:</strong> {result.data.verification_status}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
