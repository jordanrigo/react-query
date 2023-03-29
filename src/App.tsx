import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import BasicForm from "./BasicForm";
import { useAddPet, useFindPetsByStatus } from "./services/pet/pet";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  const { data, isError, isLoading, refetch } = useFindPetsByStatus({
    status: "available",
  });

  console.log({ data, isLoading });

  const { mutateAsync: createPetAsync } = useAddPet();

  const { mutateAsync: loginAsync } = useMutation({
    mutationFn: (credentials: any) => {
      return axios.post("https://dummyjson.com/auth/login", credentials);
    },
  });

  const handleCreatePet = async () => {
    try {
      await createPetAsync({
        data: {
          id: 1123456,
          name: "RTK-QUERY",
          category: {
            id: 1,
            name: "Dogs",
          },
          photoUrls: ["string"],
          tags: [
            {
              id: 0,
              name: "string",
            },
          ],
          status: "available",
        },
      });

      refetch();
      console.log("Added Success");
    } catch (e) {
      console.error("elhasalt");
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await loginAsync({
        username: "kminchelle",
        password: "0lelplR",
      });

      console.log({ data });

      localStorage.setItem("accessToken", data.token);

      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={handleCreatePet}>Add Pet</button>
        <button onClick={handleLogin}>Login</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <BasicForm />
    </div>
  );
}

export default App;
