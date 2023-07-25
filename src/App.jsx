import { useState } from 'react';
import './App.css';
import Home from './Home/Home';
import { FormProvider } from './Context';

const store = () => {
  const pictures = localStorage.getItem('items');
  if (pictures) {
    return JSON.parse(pictures);
  }
  return [];
};

function App() {
  const [show, setShow] = useState(false);
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
        }}
      >
        <Home />
      </FormProvider>
    </div>
  );
}

export default App;
