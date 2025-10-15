import React from 'react'

export default function FormInput({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-slate-700">{label}</span>
      <input className="mt-1 block w-full rounded border border-slate-200 p-2 bg-white" {...props} />
    </label>
  )
}
