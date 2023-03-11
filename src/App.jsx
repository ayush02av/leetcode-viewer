// import react router
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import pages
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
// import components
import Header from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-100 h-screen">
        <Routes>
          <Route path="/"><Route index element={<Home />} /></Route>
          <Route path="/dashboard/:username"><Route index element={<Dashboard />} /></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}