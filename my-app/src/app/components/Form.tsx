
"use client"
import React, { useState } from 'react';
import {FormData, schema} from "@/app/zod_types/user"

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        idNumber: '',
        dateOfBirth: (() => {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + 90); // Example: 90 days in the future
          return futureDate;
        })(),
        email: '',
      });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedData = schema.safeParse({
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth), // Convert string to Date for validation
    });

    if (!parsedData.success) {
      const errorMessages: Record<string, string> = {};
      parsedData.error.errors.forEach((error) => {
        errorMessages[error.path[0]] = error.message;
      });
      setErrors(errorMessages);
    } else {
      setErrors({});
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-6 bg-white rounded-lg shadow-md">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">שם פרטי</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">שם משפחה</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">תעודת זהות</label>
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">תאריך לידה</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth.toString()}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">דוא&quot;ל</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        שמור
      </button>
    </form>
  );
};

export default UserForm;
