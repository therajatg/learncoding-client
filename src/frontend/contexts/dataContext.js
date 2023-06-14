import { useContext, createContext, useReducer } from "react";
import { useState, useEffect } from "react";
import {
  dataReducer,
  getSearchData,
  getCategoryData,
} from "../reducers/dataReducer";
import axios from "axios";

const DataContext = createContext();

const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:5000/api/videos");
      dataDispatch({ type: "ORIGINAL", payload: res?.data?.videos });
    })();
  }, []);

  const [dataState, dataDispatch] = useReducer(dataReducer, {
    historyData: [],
    watchLaterData: [],
    likedData: [],
    playlistData: [],
    originalData: [],
    filteredData: [],
  });

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };

//doubt: When I am setting filteredData to allVideos inside the initial state of dataState, it's not working but if I do it outside the state I am able to do it as now videos are rendered on the home page.
