import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSlider,
  fetchSliders,
  deleteSlider,
  toggleSliderStatus,
  editSlider,
} from "../redux/dataSlice";
import { BASE_URL } from "../config/url";

const Slider = () => {
  const dispatch = useDispatch();
  const sliders = useSelector((state) => state.data.sliders);
  const loading = useSelector((state) => state.data.loading);

  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchSliders());
  }, [dispatch]);

  const handleUploadOrUpdate = async () => {
    if (!alt && !file) return;

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("alt_text", alt);

    if (editId) {
      await dispatch(editSlider({ id: editId, formData }));
      await dispatch(fetchSliders());
    } else {
      await dispatch(addSlider(formData));
      await dispatch(fetchSliders());

    }

    setAlt("");
    setFile(null);
    setEditId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteSlider(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleSliderStatus(id));
  };

  const handleEdit = (item) => {
    setAlt(item.alt_text);
    setEditId(item._id);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Slider Management</h2>

      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <input
          type="text"
          placeholder="Alt Text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          className="bg-green-600 text-white p-2 rounded"
          onClick={handleUploadOrUpdate}
        >
          {editId ? "Update" : "Upload"}
        </button>
      </div>

      {loading && <p>Loading sliders...</p>}

      <div className="grid gap-4">
        {sliders.map((item) => (
          <div key={item._id} className="border p-2 rounded">
            <img
              src={`${BASE_URL}uploads/${item.image_url}`}
              crossOrigin="anonymous"
              className="h-40 w-full object-cover mb-2"
              alt={item.alt_text}
            />
            <p className="mb-2">Alt: {item.alt_text}</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleToggle(item._id)}
                className={`p-2 text-white rounded ${item.active ? "bg-yellow-500" : "bg-gray-600"}`}
              >
                {item.active ? "Activate" : "Block"}
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-600 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white p-2 rounded"
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

export default Slider;
