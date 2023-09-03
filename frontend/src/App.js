import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import UploadAndDisplayImage from './components/UploadButtons';

function App() {
  return (
    <div className="App">
      <div className='App1' style={{margin:'auto',top:'50rem',left:'50rem'}}>
      </div>
      <Navbar/>
      <div className='mid' style={{position:'absolute',left:'50%',top:"50%",transform:'translate(-50%,-50%)'}}>
        <UploadAndDisplayImage/>
      </div>
    </div>
  );
}

export default App;
