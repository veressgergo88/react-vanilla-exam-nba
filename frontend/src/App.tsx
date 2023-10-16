import { useEffect, useMemo, useState } from "react";
import { loadTeams, type Team } from "./api";

export default function App() {
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("Select a team");
  const [valamiInput, setValamiInput] = useState("")

  const loadTeamsHandler = async () => {
    const response = await loadTeams();
    if (!response.success) {
      setError("Cannot find teams!");
    } else {
      setTeams(response.data);
    }
  };

  useEffect(() => {
    loadTeamsHandler();
  }, []);

  const teamData = useMemo(() => teams.find((t) => t.name === selectedTeam),[selectedTeam]);
  
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="card-title">
          <h1>Vote NBA players</h1>
        </div>
        <div>
          <label>
            Select your favorite player's team
            <h1>{error}</h1>
            <select
              className="select select-bordered w-full max-w-xs"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option>{selectedTeam}</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {teamData?.players.length ? (
          <ul className="mt-4">
            {teamData.players.map((player) => (
              <li
                className="flex justify-between items-center gap-10 mt-4 mb-4"
                key={player.id}
              >
                <h2 className="text-xl">{player.name}</h2>
                <button className="btn btn-primary">Vote</button>
              </li>
            ))}
          </ul>
        ) : (
          <h2>There is no players!</h2>
        )}
      </div>
    </div>
  );
}
