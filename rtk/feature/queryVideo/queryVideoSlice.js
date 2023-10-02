const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { default: fetch } = require('node-fetch');

const initialState = {
  loading: false,
  queryVideos: [],
  error: '',
};

const queryFetch = createAsyncThunk('queryVideo/videoFetch', async (query) => {
  const queryVideos = await fetch(
    `http://localhost:9000/videos?tags_like=${
      Array.isArray(query) ? query.join('&tags_like=') : query
    }`
  );
  const res = await queryVideos.json();
  switch (Array.isArray(res)) {
    case true:
      const sortedData = res.sort((a, b) => b.views.localeCompare(a.views));
      return sortedData;

    default:
      return res;
  }
});

const queryVideoSlice = createSlice({
  name: 'queryVideo',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(queryFetch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(queryFetch.fulfilled, (state, action) => {
      state.queryVideos = action.payload;
      state.loading = false;
    });
    builder.addCase(queryFetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message;
    });
  },
});

module.exports = queryVideoSlice.reducer;
module.exports.queryFetch = queryFetch;
