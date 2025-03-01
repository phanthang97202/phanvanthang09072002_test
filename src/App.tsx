import { Route, Routes } from "react-router";
import PageNotFound from "./components/page-not-found/page-not-found";
import HomePage from "./pages/home-page/home-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
