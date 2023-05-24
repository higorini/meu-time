import "./style.css";
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

function Login() {
  const [value, setValue] = useLocalStorage("key", "");
  const [key, setKey] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {}, [data]);

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleLoginClick = async () => {
    let setKey = [];
    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", key);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (key.length == 32) {
      setKey = await fetch(
        `https://v3.football.api-sports.io/status`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => result.response);
    } else {
      console.log("Key inválida");
    }

    if (setKey.length != 0) {
      setData([setKey]);
      setError({
        error: false,
        message: "",
      });
      setValue(key);
    } else {
      setError({
        error: true,
        message: "Key inválida",
      });
    }
  };

  return (
    <div className="main-login">
      <div className="login-container">
        <h2>Login</h2>
        <p>Insira sua key para entrar:</p>
        <input
          type="text"
          className="login-key"
          placeholder="Key"
          value={key}
          onChange={handleKeyChange}
        />
        {error.error && <p className="error-message">{error.message}</p>}
        <button className="login-button" onClick={handleLoginClick}>
          Logar
        </button>
        <p>
          Não tem uma key?{" "}
          <a href="#" className="get-key-link">
            Consiga uma aqui!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
