import { useEffect, useState } from "react"
import { loadTeams, type Team, type Player } from "./api"

export default function App() {
  const [error, setError] = useState<string | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [selectedTeam, setSelectedTeam] = useState("Select a team")
  const [selectedTeamData, setSelectedTeamData] = useState<Team>()
  const [isSubmit, setIsSubmit] = useState(false)
  
  const loadTeamsHandler = async () => {
      const response = await loadTeams()
      if (!response.success) {
        setError("Cannot find teams!")
        } else {
        setTeams(response.data)
      }
  }
  
  useEffect(() => {
    loadTeamsHandler()
  },[])

  const subTeam = () => {
    const teamData = teams.find((t) => t.name === selectedTeam)
    setSelectedTeamData(teamData)
    if(selectedTeamData)
      setPlayers(selectedTeamData.players)
    
    setIsSubmit(true)
  }

  return (
    <>
      <h1>Vote NBA players</h1>
      <div>
        <label>Select your favorite player's team
          <h1>{error}</h1>
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option>{selectedTeam}</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>{team.name}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={subTeam}>Show the players</button>
      <div>
        { isSubmit && (
        <>
          {players.map((player) => (
            <div key={player.id}>
              <h2>{player.name}</h2>
              <button>Vote</button>
            </div>
          ))}
        </>
        )}
      </div>
    </>
  )
}