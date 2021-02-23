import './App.css';
import Kalendaro from './Kalendaro';

function App() {
  return (
    <div className="App">
    <header>
      <div id="logo">
        <span className="icon">date_range</span>
        <span>
          randevu<b>al</b>
        </span>
      </div>
    </header>
    <main>
      <Kalendaro />
    </main>
  </div>
  );
}

export default App;
