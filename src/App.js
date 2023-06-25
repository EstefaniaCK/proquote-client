import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import BidsPage from './pages/BidsPage/BidsPage';
import ItemsPage from './pages/ItemsPage/ItemsPage';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Header />
      <Routes className="body">
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:projectid/items' element={<ItemsPage />} />
        <Route path='/projects/:projectid/bids' element={<BidsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
