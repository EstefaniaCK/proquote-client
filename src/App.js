import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss';

import HomePage from './pages/HomePage/HomePage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import BidsPage from './pages/BidsPage/BidsPage';
import ItemsPage from './pages/ItemsPage/ItemsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:projectid/items' element={<ItemsPage />} />
        <Route path='/bids' element={<BidsPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
