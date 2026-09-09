import { useState } from "react";
import Modal from "./Modal";

const initialForm = { name: "", age: "", gender: "Female" };

const inputClasses =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";
const labelClasses = "mb-1 block text-sm font-semibold text-slate-700";

export default function AddPatientModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  }

  return (
    <Modal open={open} title="Add New Patient" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPatientName" className={labelClasses}>
            Full Name
          </label>
          <input
            id="newPatientName"
            name="name"
            type="text"
            required
            placeholder="e.g., Sunita Devi"
            value={form.name}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="newPatientAge" className={labelClasses}>
              Age
            </label>
            <input
              id="newPatientAge"
              name="age"
              type="number"
              required
              placeholder="48"
              value={form.age}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="newPatientGender" className={labelClasses}>
              Gender
            </label>
            <select
              id="newPatientGender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClasses}
            >
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Save Patient
          </button>
        </div>
      </form>
    </Modal>
  );
}
