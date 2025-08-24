import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchVehicles",
  async (_, { getState }) => {
    const { filters } = getState();
    const res = await axios.get(
      "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
    );

    let items = Array.isArray(res.data.items) ? res.data.items : res.data;

    const searchCity = filters.city.split(",")[0].trim().toLowerCase();

    const equipmentMap = {
      ac: "AC",
      bathroom: "bathroom",
      kitchen: "kitchen",
      tv: "TV",
    };

    items = items.filter((item) => {
      const cityFromApi = item.location.split(",")[1]?.trim().toLowerCase();
      const matchesCity = searchCity === "" ? true : cityFromApi === searchCity;

      const matchesEquipment =
        filters.equipments.length === 0
          ? true
          : filters.equipments.every((eq) => {
              const eqLower = eq.trim().toLowerCase();

              if (eqLower === "automatic") {
                return item.transmission?.toLowerCase() === "automatic";
              }

              const key = equipmentMap[eqLower];
              if (!key) return false;

              return Boolean(item[key]) === true;
            });

      const matchesType =
        filters.vehicleTypes.length === 0
          ? true
          : item.form === filters.vehicleTypes[0];

      return matchesCity && matchesEquipment && matchesType;
    });

    return items;
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearVehicles: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearVehicles } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
