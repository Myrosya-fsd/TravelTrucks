import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    city: "",
    equipments: [],
    vehicleTypes: [],
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setEquipments: (state, action) => {
      state.equipments = action.payload;
    },
    setVehicleTypes: (state, action) => {
      state.vehicleTypes = action.payload;
    },
  },
});

export const { setCity, setEquipments, setVehicleTypes } = filtersSlice.actions;
export default filtersSlice.reducer;
