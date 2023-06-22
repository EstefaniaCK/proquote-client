import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss';

import HomePage from './pages/HomePage/HomePage';
import ProjectListPage from './pages/ProjectListPage/ProjectListPage';
import BidsPage from './pages/BidsPage/BidsPage';
import ItemsPage from './pages/ItemsPage/ItemsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectListPage />} />
        <Route path='/projects/:projectid/items' element={<ItemsPage />} />
        <Route path='/bids' element={<BidsPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
