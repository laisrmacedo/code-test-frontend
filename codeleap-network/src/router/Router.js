import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "../pages/Signup";

export const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Signup/>}/>
        {/* <Route path={``} element={}/> */}
      </Routes>
    </BrowserRouter>
  )
}