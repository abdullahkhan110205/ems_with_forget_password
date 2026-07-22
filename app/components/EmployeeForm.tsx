"use client";

import { useState } from "react";

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    departmentId: "",
    position: "",
    joinedAt: "",
    salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="space-y-4">
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <select
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
      </select>

      <input
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
      />

      <input
        name="joinedAt"
        type="date"
        value={formData.joinedAt}
        onChange={handleChange}
      />

      <input
        name="salary"
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
      />

      <button type="submit">
        Save Employee
      </button>
    </form>
  );
}