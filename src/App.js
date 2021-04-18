import logo from './logo.svg';
import './App.css';
import CompWithState from './CompWithState'
import EventHandlerClosesOverTheState from './EventhandlerClosesOverTheState'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CompWithState/>
        <EventHandlerClosesOverTheState />
      </header>
    </div>
  );
}

export default App;
