import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { MainScreen } from "../pages/MainScreen";

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Signup/>}/>
        <Route path={`/posts`} element={<MainScreen/>}/>
      </Routes>
    </BrowserRouter>
  )
}