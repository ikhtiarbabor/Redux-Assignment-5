const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');
const { queryFetch } = require('../queryVideo/queryVideoSlice');

const videoFetch = createAsyncThunk('video/videoFetch', async (dispatch) => {
  const video = await fetch('http://localhost:9000/videos');
  const res = await video.json();
  dispatch(queryFetch(res?.tags));
  return res;
});
const initialState = {
  loading: false,
  videos: {},
  error: '',
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(videoFetch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(videoFetch.fulfilled, (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    });
    builder.addCase(videoFetch.rejected, (state, action) => {
      state.error = action.error?.message;
      state.loading = false;
    });
  },
});
module.exports = videoSlice.reducer;
module.exports.videoFetch = videoFetch;
