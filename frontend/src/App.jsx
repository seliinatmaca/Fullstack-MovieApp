import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Header from './components/Header';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;