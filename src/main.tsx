import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MotionSettings } from './components/MotionSettings';
import "./index.css";
import './motion.css';
import './studio-layout.css';
import './portfolio-refinements.css';
import './portrait-studio.css';
import './studio-loader.css';
import './mobile-polish.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionSettings><App /></MotionSettings>
    </BrowserRouter>
  </React.StrictMode>,
);
