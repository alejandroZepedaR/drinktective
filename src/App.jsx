import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import RecipePage from "./pages/RecipePage";
import SavedPage from "./pages/SavedPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path="/recipe/:id" element={<RecipePage/>} /> 
      <Route path="/saved" element={<SavedPage />}/>
    </Routes>
  )
}

export default App
