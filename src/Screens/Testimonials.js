import React, { useEffect, useState } from "react";

import {
  fetchTestimonials,
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
  toggleStatus,
} from "../redux/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Testimonials = () => {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!name || !message) return alert("Fill all fields");

    if (editId) {
      dispatch(editTestimonial({ id: editId, name, message })).then(() => {
        dispatch(fetchTestimonials());
      });
      setEditId(null);
    } else {
      dispatch(addTestimonial({ name, message })).then(() => {
        dispatch(fetchTestimonials());
      });
    }

    setName("");
    setMessage("");
  };

  const handleEditClick = (item) => {
    setEditId(item._id);
    setName(item.name);
    setMessage(item.message);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Manage Testimonials</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="border p-2 w-full mb-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
       
        <button
          className="bg-green-600 text-white p-2 rounded"
          onClick={handleSubmit}
        >
          {editId ? "Update" : "Add"} Testimonial
        </button>
        {editId && (
          <button
            className="ml-2 p-2 rounded bg-gray-400 text-white"
            onClick={() => {
              setEditId(null);
              setName("");
              setMessage("");
            }}
          >
            Cancel
          </button>
        )}
      </div>

    

      <div className="grid gap-4">
        {testimonials?.map((item) => (
          <div key={item._id} className="border p-3 rounded shadow-sm bg-white">
            <p className="font-semibold">{item?.name}</p>
            <p className="mb-2">{item?.message}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className={`p-2 text-white text-sm rounded ${
                  item.active ? "bg-yellow-500" : "bg-gray-600"
                }`}
                onClick={() => dispatch(toggleStatus(item?._id))}
              >
                {item?.active ? "Block" : "Activate"}
              </button>
              <button
                className="bg-blue-600 text-white p-2 text-sm rounded"
                onClick={() => handleEditClick(item)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white p-2 text-sm rounded"
                onClick={() => dispatch(deleteTestimonial(item?._id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;