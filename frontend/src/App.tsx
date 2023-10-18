import { useEffect, useMemo, useState } from "react";
import { loadTeams, type Team } from "./api";
import { postVote } from "./api/post";
import Select from "./components/Select";

export default function App() {
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("");

  const loadTeamsHandler = async () => {
    const response = await loadTeams();
    if (!response.success) {
      setError("Cannot find teams!");
    } else {
      setTeams(response.data);
    }
  };

  const teamData = useMemo(() => teams.find((t) => t.name === selectedTeam),[selectedTeam]);

  const voteHandler = async (playerId:number) => {
    const response = await postVote(playerId)
    if (response.success){
      console.log("The vote was sent")
    } else {
      console.log("The vote wasn't sent!")
    }
  }

  useEffect(() => {
    loadTeamsHandler()
  }, [])
  
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <div className="card-title">
          <h1>Vote NBA players</h1>
        </div>
        <div>
          <Select error={error} teams={teams} selectedTeam={selectedTeam}/>
        </div>

        {teamData?.players.length ? (
          <ul className="mt-4">
            {teamData.players.map((player) => (
              <li
                className="flex justify-between items-center gap-10 mt-4 mb-4"
                key={player.id}
              >
                <h2 className="text-xl">{player.name}</h2>
                <button className="btn btn-primary" onClick={() => voteHandler(player.id)}>Vote</button>
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
