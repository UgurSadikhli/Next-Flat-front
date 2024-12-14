// // src/features/propertiesSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   properties: [],
//   status: 'idle',
//   error: null,
// };

// // export const fetchProperties = createAsyncThunk(
// //   'properties/fetchProperties',
// //   async () => {
// //     const response = await axios.get('http://localhost:3000/apartments'); 
// //     console.log(response.data);
// //     return response.data;
// //   }
// // );

// const propertiesSlice = createSlice({
//   name: 'properties',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProperties.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProperties.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.properties = action.payload;
//       })
//       .addCase(fetchProperties.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default propertiesSlice.reducer;
