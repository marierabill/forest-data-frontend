import axios from "axios";
import { supabase } from "./supabaseClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_LIVE_API = import.meta.env.VITE_USE_LIVE_API === "true";

// Helper function to get JWT token from Supabase
async function getAuthHeader() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) throw new Error("User not authenticated");
  return { Authorization: `Bearer ${session.access_token}` };
}

/* ==============================
   FORESTRY RECORDS
============================== */

// Add new record
export async function addRecord(recordData) {
  if (!USE_LIVE_API) {
    // Mock response
    return {
      status: "success",
      message: "Record successfully saved and logged on blockchain (mock).",
      data: {
        ...recordData,
        record_id: "mock_001",
        txHash: "0xMOCKHASH12345",
        timestamp: new Date().toISOString(),
      },
    };
  }

  const headers = await getAuthHeader();
  const res = await axios.post(`${API_BASE_URL}/records`, recordData, { headers });
  return res.data;
}

// Fetch all records
export async function getRecords() {
  if (!USE_LIVE_API) {
    return {
      status: "success",
      data: [
        {
          record_id: "rec_001",
          forest_station: "Nakuru Central",
          officer_name: "James Kariuki",
          activity_type: "Tree Planting",
          activity_date: "2025-10-12",
          status: "Verified",
          txHash: "0xMOCKHASH1",
          timestamp: "2025-10-12T14:23:41Z",
        },
      ],
    };
  }

  const headers = await getAuthHeader();
  const res = await axios.get(`${API_BASE_URL}/records`, { headers });
  return res.data;
}

/* ==============================
   PERMIT VERIFICATION
============================== */

export async function verifyPermit(permitId) {
  if (!USE_LIVE_API) {
    if (permitId === "KFS-PMT-2025-00017") {
      return {
        status: "success",
        message: "Permit verified on blockchain (mock).",
        data: {
          permit_id: "KFS-PMT-2025-00017",
          forest_station: "Molo",
          officer_name: "Beatrice Njeri",
          activity_type: "Permit Issuance",
          activity_date: "2025-09-30",
          permit_number: "PRMT123456",
          txHash: "0xMOCKVALIDHASH",
          timestamp: "2025-09-30T09:45:18Z",
          verification_status: "Valid",
        },
      };
    } else {
      return {
        status: "error",
        message: "Permit not found or not yet recorded on blockchain (mock).",
        verification_status: "Invalid",
      };
    }
  }

  const headers = await getAuthHeader();
  const res = await axios.get(`${API_BASE_URL}/verification/${permitId}`, { headers });
  return res.data;
}

/* ==============================
   DASHBOARD METRICS
============================== */

export async function fetchMetrics() {
  if (!USE_LIVE_API) {
    // Mock dashboard metrics until backend provides endpoint
    return {
      status: "success",
      data: {
        total_records: 128,
        total_permits: 42,
        trees_planted: 9860,
        stations_active: 7,
        last_updated: new Date().toISOString(),
      },
    };
  }

  const headers = await getAuthHeader();
  const res = await axios.get(`${API_BASE_URL}/metrics`, { headers });
  return res.data;
}
