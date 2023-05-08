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
  const [data, setData] = useState(store);
  return (
    <div className="App">
      <FormProvider value={{ show, setShow, data, setData }}>
        <Home />
      </FormProvider>
    </div>
  );
}

export default App;
