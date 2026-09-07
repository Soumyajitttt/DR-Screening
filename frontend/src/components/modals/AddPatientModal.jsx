import { useState } from "react";
import Modal from "./Modal";

const initialForm = { name: "", age: "", gender: "Female" };

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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPatientName">Full Name</label>
          <input
            id="newPatientName"
            name="name"
            type="text"
            required
            placeholder="e.g., Sunita Devi"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="newPatientAge">Age</label>
          <input
            id="newPatientAge"
            name="age"
            type="number"
            required
            placeholder="48"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="newPatientGender">Gender</label>
          <select id="newPatientGender" name="gender" value={form.gender} onChange={handleChange}>
            <option>Female</option>
            <option>Male</option>
          </select>
        </div>

        <div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save Patient</button>
        </div>
      </form>
    </Modal>
  );
}
