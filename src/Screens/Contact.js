
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  deleteContact,
} from "../redux/dataSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.data.contacts);
  const loading = useSelector((state) => state.data.loading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Contact Form Submissions</h2>
      {loading && <p>Loading...</p>}

      <div className="grid gap-4">
        {contacts?.map((entry) => (
          <div key={entry._id} className="border p-2 rounded">
            <p><strong>Name:</strong> {entry.name}</p>
            <p><strong>Email:</strong> {entry.email}</p>
            <p><strong>Phone:</strong> {entry.phone}</p>
            <p><strong>Message:</strong> {entry.message}</p>
            <button
              onClick={() => handleDelete(entry._id)}
              className="bg-red-600 text-white p-2 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
