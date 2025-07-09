
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  addService,
  deleteService,
  toggleServiceStatus,
  editService,
} from "../redux/dataSlice";
import { BASE_URL } from "../config/url";

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.data.services);
  const loading = useSelector((state) => state.data.loading);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleAddOrUpdate = async () => {
    if (!title) return alert("Title is required");

    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    if (editMode) {
      await dispatch(editService({ id: editId, formData }));
      dispatch(fetchServices())
      setEditMode(false);
      setEditId(null);

    } else {
      if (!image) return alert("Image is required for new service");
      await dispatch(addService(formData));
      dispatch(fetchServices())
    }

    setTitle("");
    setImage(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteService(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleServiceStatus(id));
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setEditMode(true);
    setEditId(service._id);
    setImage(null); 
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Manage Services</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Service Title"
          className="border p-2 w-full mb-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className="mb-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className={`${
            editMode ? "bg-blue-600" : "bg-green-600"
          } text-white p-2 rounded`}
          onClick={handleAddOrUpdate}
        >
          {editMode ? "Update Service" : "Add Service"}
        </button>
        {editMode && (
          <button
            className="ml-2 bg-gray-400 text-white p-2 rounded"
            onClick={() => {
              setEditMode(false);
              setTitle("");
              setImage(null);
              setEditId(null);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service._id} className="border p-2 rounded">
            <img
              src={`${BASE_URL}uploads/services/${service.image_url}`}
              alt={service.title}
              className="h-40 w-full object-cover mb-2"
              crossOrigin="anonymous"
            />
            <p className="font-semibold mb-2">{service.title}</p>
            <div className="flex gap-2">
              <button
                className={`p-2 text-white rounded ${
                  service.active ? "bg-yellow-500" : "bg-gray-600"
                }`}
                onClick={() => handleToggle(service._id)}
              >
                {service.active ? "Block" : "Activate"}
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleEdit(service)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white p-2 rounded"
                onClick={() => handleDelete(service._id)}
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

export default Services;
