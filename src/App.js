import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss';
import HomePage from './pages/HomePage';
import ProjectList from './pages/ProjectList/ProjectList';
import Items from './pages/Items/Items';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/projects/:projectid/items' element={<Items />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
