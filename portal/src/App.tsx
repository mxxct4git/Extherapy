import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Knowledge } from "./pages/Knowledge";
import { Activities } from "./pages/Activities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="activities" element={<Activities />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
