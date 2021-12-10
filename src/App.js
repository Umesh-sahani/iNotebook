import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import { Home } from './components/Home';
import { About } from './components/About';
import { PageNotFound } from './components/PageNotFound';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/about" element={<About />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>


      </Router>

    </>
  );
}

export default App;
