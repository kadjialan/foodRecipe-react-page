import { useState } from 'react';
import './App.css';
import { charles } from './Component/Form/Form';
import { FormProvider } from './Context';
import Home from './Home/Home';

function App() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(charles);
  return (
    <div className="App">
      <FormProvider value={{ show, setShow, data, setData }}>
        <Home />
      </FormProvider>
    </div>
  );
}

export default App;
