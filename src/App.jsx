import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
/* import Home from './pages/Home/Home'; */
import Landing from './pages/landing/Landing';
import { FormProvider } from './Context';

const store = () => {
  const pictures = localStorage.getItem('items');
  if (pictures) {
    return JSON.parse(pictures);
  }
  return [];
};

function App() {
  const [info, setinfo] = useState();
  const [show, setShow] = useState(false);
  const [view, setview] = useState(false);
  const [numb, setNumb] = useState();
  const [data, setData] = useState(store);
  const [deleteIdem, setDeleteIdem] = useState(false);
  return (
    <div className="App">
      <FormProvider
        value={{
          show,
          setShow,
          data,
          setData,
          deleteIdem,
          setDeleteIdem,
          numb,
          setNumb,
          info,
          setinfo,
          view,
          setview,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </div>
  );
}

export default App;
