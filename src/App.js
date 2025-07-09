import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import About from "./Screens/About";
import Contact from "./Screens/Contact";
import Services from "./Screens/Services";
import Testimonials from "./Screens/Testimonials";
import Slider from "./Screens/Slider";
import Login from "./Screens/Login";
import PrivateRoute from "./Screens/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="slider" element={<PrivateRoute><Slider /></PrivateRoute>} />
          <Route path="about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="services" element={<PrivateRoute><Services /></PrivateRoute>}/>
          <Route path="testimonials" element={<PrivateRoute><Testimonials /></PrivateRoute>}/>
          <Route path="contacts" element={<PrivateRoute><Contact /></PrivateRoute>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
