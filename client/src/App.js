import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/users/all');
        setUsers(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUsers();
  }, []);

  const renderUsers = () => {
    return Object.keys(users).map((userId) => {
      return (
        <div key={userId}>
          <h3>{`user ${userId}`}</h3>
          <p>{`cash=${users[userId].cash}, credit=${users[userId].credit}`}</p>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <h1>All users</h1>
      <div>
        { renderUsers() }
      </div>
    </div>
  );
}

export default App;
