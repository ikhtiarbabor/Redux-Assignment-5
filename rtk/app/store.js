const { configureStore } = require('@reduxjs/toolkit');
const { createLogger } = require('redux-logger');
const videoReducer = require('../feature/video/videoSlice');
const queryVideoReducer = require('../feature/queryVideo/queryVideoSlice');
const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videoReducer,
    queryVideo: queryVideoReducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
});
module.exports = store;
