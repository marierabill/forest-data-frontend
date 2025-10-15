import React, { useEffect, useState } from "react";
import { fetchMetrics } from "../api/mockApi";

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchMetrics()
      .then((res) => {
        if (mounted) {
          // Some APIs wrap data under res.data, some return directly
          const data = res?.data || res;
          setMetrics(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load metrics:", err);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-slate-500">Loading dashboard metrics…</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Dashboard Section */}
      <div className="col-span-2 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Forest Data Dashboard</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <MetricCard title="Total Records" value={metrics.total_records} />
          <MetricCard title="Total Permits" value={metrics.total_permits} />
          <MetricCard title="Trees Planted" value={metrics.trees_planted} />
          <MetricCard title="Active Stations" value={metrics.stations_active} />
          <MetricCard
            title="Last Updated"
            value={new Date(metrics.last_updated).toLocaleString()}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Quick Actions</h4>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="/data-entry" className="text-green-600 hover:underline">
              + New Planting Record
            </a>
          </li>
          <li>
            <a href="/verification" className="text-blue-600 hover:underline">
              Verify a Permit
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-bold mt-1">{value ?? "—"}</div>
    </div>
  );
}
