import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/dashboard.css";

function Dashboard() {
  const [value, setValue] = useLocalStorage("key", "");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    country: "",
    league: "",
    seasons: "",
    teams: "",
  });
  const [country, setCountry] = useState([]);
  const [league, setLeague] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (value.length == 0) {
      return navigate("/");
    }
  }, [value]);

  const api = axios.create({
    baseURL: "https://v3.football.api-sports.io",
    timout: 10000,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": value,
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function getCountry() {
    const result = await api.get("/countries");
    setCountry(result.data.response);
  }

  async function getLeague() {
    const result = await api.get("/leagues");
    result.data.response = result.data.response.filter(
      (item) => item.country.name === form.country
    );
    result.data.response = result.data.response.sort((a, b) =>
      a.league.name.localeCompare(b.league.name)
    );
    result.data.response = result.data.response.map((item) => {
      return { name: item.league.name, id: item.league.id };
    });
    console.log(result.data.response);
    setLeague(result.data.response);
  }

  async function getSeasons() {
    const result = await api.get("/leagues/seasons");
    setSeasons(result.data.response);
  }

  async function getTeams() {
    const result = await api.get(
      `/teams?league=${form.league}&season=${form.seasons}`
    );
    result.data.response = result.data.response.map((item) => {
      return { name: item.team.name, id: item.team.id };
    });
    setTeams(result.data.response);
  }

  async function getPlayers() {
    const result = await api.get(
      `/players?team=${form.teams}&season=${form.seasons}`
    );
    console.log(result.data.response);
    result.data.response = result.data.response.map((item) => {
      return {
        name: item.player.name,
        age: item.player.age,
        nationality: item.player.nationality,
      };
    });
    console.log(result.data.response);
    setPlayers(result.data.response);
  }

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    if (form.country) {
      getLeague();
    }
  }, [form.country]);

  useEffect(() => {
    if (form.league) {
      getSeasons();
    }
  }, [form.league]);

  useEffect(() => {
    if (form.seasons) {
      getTeams();
    }
  }, [form.seasons]);

  useEffect(() => {
    if (form.teams) {
      getPlayers();
    }
  }, [form.teams]);

  return (
    <div className="dashboard">
      <div className="dashboard-title">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-select">
        <form className="select country">
          <select
            name="country"
            required="required"
            onChange={(event) => handleChange(event)}
          >
            <option disabled selected defaultValue="" value>
              Selecione um país:
            </option>
            {country &&
              country.map((item) => (
                <option name="country" key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </form>

        {form.country && (
          <form className="select league">
            <select
              name="league"
              required="required"
              onChange={(event) => handleChange(event)}
            >
              <option disabled selected defaultValue="" value>
                Selecione uma temporada:
              </option>
              {league &&
                league.map((item) => (
                  <option name="league" key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </form>
        )}

        {form.league && (
          <form className="select seasons">
            <select
              name="seasons"
              required="required"
              onChange={(event) => handleChange(event)}
            >
              <option disabled selected defaultValue="" value>
                Selecione uma temporada:
              </option>
              {seasons &&
                seasons.map((item) => (
                  <option name="seasons" key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </form>
        )}

        {form.seasons && (
          <form className="select teams">
            <select
              name="teams"
              required="required"
              onChange={(event) => handleChange(event)}
            >
              <option disabled selected defaultValue="" value>
                Selecione um time:
              </option>
              {teams &&
                teams.map((item) => (
                  <option name="teams" key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </form>
        )}
      </div>

      {form.teams && (
        <div className="dashboard-players">
          <div className="dashboard-header">
            <p>Nome</p>
            <p>Idade</p>
            <p>Nacionalidade</p>
          </div>
          <div className="dashboard-content">
            {players.map((item) => (
              <div key="" className="dashboard-player">
                <p>{item.name}</p>
                <p>{item.age}</p>
                <p>{item.nationality}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
