import { gql, useQuery } from "@apollo/client";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const GET_STORES = gql`
    query getStores {
      getStores {
        name
        orders {
          arrivalTime
          order
          wait
          payment
          total
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_STORES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log("data", data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
