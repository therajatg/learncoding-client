function dataReducer(state, action) {
  switch (action.type) {
    case "HISTORY":
      return { ...state, historyData: action.payload };
    case "WATCH_LATER":
      console.log("payload", action.payload);
      return { ...state, watchLaterData: action.payload };
    case "LIKED":
      return { ...state, likedData: action.payload };
    case "PLAYLIST":
      return { ...state, playlistData: action.payload };
    case "SINGLE_PLAYLIST":
      const data = state.playlistData.filter(
        (item) => item._id !== action.payload._id
      );

      return { ...state, playlistData: [...data, action.payload] };

    case "SEARCH":
      return {
        ...state,
        filteredData: state.originalData.filter((video) =>
          video.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case "CATEGORY":
      return {
        ...state,
        filteredData: state.originalData.filter(
          (video) => video.category_id == action.payload
        ),
      };
    case "ORIGINAL":
      return {
        ...state,
        filteredData: action.payload,
        originalData: action.payload,
      };
    case "RESET":
      return { ...state, filteredData: state.originalData };
    default:
      return state;
  }
}

export { dataReducer };
