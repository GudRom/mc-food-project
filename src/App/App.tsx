import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import MainPage from './pages/MainPage';
import RecipePage from './pages/RecipePage';
import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route path="/recipes" element={<MainPage />} />
          <Route path="recipes/:id" element={<RecipePage />} />
          <Route path="*" element={<Navigate to="/recipes" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
