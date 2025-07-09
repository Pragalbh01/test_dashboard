import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config/url";


const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});


export const fetchTestimonials = createAsyncThunk(
  "testimonial/fetchAll",
  async () => {
    const res = await axios.get(`${BASE_URL}api/testimonials/get-testimonial`, {
      headers: getAuthHeader(),
    });
    return res.data;
  }
);


export const addSlider = createAsyncThunk("slider/add", async (formData) => {
  const res = await axios.post(`${BASE_URL}api/images/upload`, formData, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.data;
});

export const addTestimonial = createAsyncThunk(
  "testimonial/add",
  async ({ name, message }) => {
    const res = await axios.post(
      `${BASE_URL}api/testimonials/add-testimonial`,
      { name, message },
      { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
    );
    return res.data;
  }
);

export const editTestimonial = createAsyncThunk(
  "testimonial/edit",
  async ({ id, name, message }) => {
    const res = await axios.put(
      `${BASE_URL}api/testimonials/${id}`,
      { name, message },
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonial/delete",
  async (id) => {
    await axios.delete(`${BASE_URL}api/testimonials/${id}`, {
      headers: getAuthHeader(),
    });
    return id;
  }
);

export const toggleStatus = createAsyncThunk(
  "testimonial/toggle",
  async (id) => {
    await axios.put(`${BASE_URL}api/testimonials/toggle/${id}`, null, {
      headers: getAuthHeader(),
    });
    return id;
  }
);




export const fetchSliders = createAsyncThunk("slider/fetchAll", async () => {
  const res = await axios.get(`${BASE_URL}api/images/get-all-images`);
  return res.data;
});


export const deleteSlider = createAsyncThunk("slider/delete", async (id) => {
  await axios.delete(`${BASE_URL}api/images/delete/${id}`, {
    headers: getAuthHeader(),
  });
  return id;
});


export const toggleSliderStatus = createAsyncThunk("slider/toggle", async (id) => {
  await axios.patch(`${BASE_URL}api/images/toggle/${id}`, null, {
    headers: getAuthHeader(),
  });
  return id;
});

export const editSlider = createAsyncThunk(
  "slider/edit",
  async ({ id, formData }) => {
    const res = await axios.put(`${BASE_URL}api/images/edit/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.updated;
  }
);



export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const res = await axios.get(`${BASE_URL}api/contact/get-contact`, {
    headers: getAuthHeader(),
  });
  return res.data;
});

export const deleteContact = createAsyncThunk("contacts/delete", async (id) => {
  await axios.delete(`${BASE_URL}api/contact/contacts/${id}`, {
    headers: getAuthHeader(),
  });
  return id;
});



export const fetchServices = createAsyncThunk("services/fetch", async () => {
  const res = await axios.get(`${BASE_URL}api/services/get-services`);
  return res.data;
});

export const addService = createAsyncThunk("services/add", async (formData) => {
  const res = await axios.post(`${BASE_URL}api/services/add-service`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
});

export const editService = createAsyncThunk(
  "services/edit",
  async ({ id, formData }) => {
    const res = await axios.put(`${BASE_URL}api/services/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data.updated;
  }
);


export const deleteService = createAsyncThunk("services/delete", async (id) => {
  await axios.delete(`${BASE_URL}api/services/${id}`, {
    headers: getAuthHeader(),
  });
  return id;
});

export const toggleServiceStatus = createAsyncThunk("services/toggle", async (id) => {
  await axios.patch(`${BASE_URL}api/services/toggle/${id}`, null, {
    headers: getAuthHeader(),
  });
  return id;
});






const dataSlice = createSlice({
  name: "data",
  initialState: {
    testimonials: [],
    sliders: [],
    contacts: [],
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials.push(action.payload);
      })

      .addCase(editTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      })

      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(
          (t) => t._id !== action.payload
        );
      })

      .addCase(toggleStatus.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(
          (t) => t._id === action.payload
        );
        if (index !== -1) {
          state.testimonials[index].active = !state.testimonials[index].active;
        }
      })



      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(addSlider.fulfilled, (state, action) => {
        state.sliders.push(action.payload);
      })

      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.sliders = state.sliders.filter((s) => s._id !== action.payload);
      })

      .addCase(toggleSliderStatus.fulfilled, (state, action) => {
        const idx = state.sliders.findIndex((s) => s._id === action.payload);
        if (idx !== -1) {
          state.sliders[idx].active = !state.sliders[idx].active;
        }
      })
      .addCase(editSlider.fulfilled, (state, action) => {
        const idx = state.sliders.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) {
          state.sliders[idx] = action.payload;
        }
      })




      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(c => c._id !== action.payload);
      })



      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addService.fulfilled, (state, action) => {
        state.services.push(action.payload);
      })

      .addCase(editService.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated || !updated._id) return;

        const idx = state.services.findIndex((s) => s._id === updated._id);
        if (idx !== -1) {
          state.services[idx] = updated;
        }
      })

      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter((s) => s._id !== action.payload);
      })

      .addCase(toggleServiceStatus.fulfilled, (state, action) => {
        const idx = state.services.findIndex((s) => s._id === action.payload);
        if (idx !== -1) {
          state.services[idx].active = !state.services[idx].active;
        }
      });




  },
});

export default dataSlice.reducer;
