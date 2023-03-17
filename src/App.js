import Gallery from './Pages/Gallery';
import ImagePage from './Pages/User';
import GlobalStyles from './Components/Global/global';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './Context/GlobalContext';
function App() {
  return (
    <GlobalProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Gallery />} />
          <Route path='/user/:id' element={<ImagePage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
