import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
   <main className="h-full bg-slate-300/20">
     <Router>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
       <Route path="/projects" element={<Projects />} />
       <Route path="/contact" element={<Contact />} />
      </Routes>
     </Router>
   </main>
  )
}

export default App
