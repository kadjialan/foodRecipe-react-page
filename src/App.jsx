import { useState } from 'react';
import './App.css';
import { FormProvider } from './Context';
import Home from './Home/Home';

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <FormProvider value={{ show, setShow, data, setData }}>
        <Home />
      </FormProvider>
    </div>
  );
}

export default App;
