import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
// import { LoginPage } from "./pages/login";
import { RouterLayout } from "./common/RouterLayout"

export const AppRouter:React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />}/>
      </Route>

      {/* <Route path="/login" element={<LoginPage />}/> */}
    </Routes>
  )
}