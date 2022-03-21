import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import AdminPanel from "./components/adminpanel/AdminPanel";
import "./App.css";
import store from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/Admin" element={<AdminPanel/>} />
        </Routes>
      </div>
    </Provider>
  )
}

export default App