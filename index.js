const store = require('./rtk/app/store');
const { videoFetch } = require('./rtk/feature/video/videoSlice');

store.subscribe(() => {
});
store.dispatch(videoFetch(store.dispatch));
