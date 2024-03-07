import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>
      <header className="py-8 bg-emerald-400 text-stone-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Supa Smoothies</h1>
        <nav className="py-4 underline flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/create">Create New Smoothie</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
