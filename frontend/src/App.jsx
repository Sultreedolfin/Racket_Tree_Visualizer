// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Visualizer  from "./Pages/Visualizer";

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualize" element={<Visualizer />} />
       </Routes>
    </>
 );
};

export default App;