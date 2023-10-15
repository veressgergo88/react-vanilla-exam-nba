import { useEffect, useState } from "react"
import { loadTeams, TeamResponse } from "./api"

export default function App() {
  const [error, setError] = useState<string | null>(null)
  const [teams, setTeams] = useState<TeamResponse[]>([])

  const loadTeamsHandler = async () => {
    const response = await loadTeams()
    if (!response.success) {
      setError("No teams!")
    } else {
      console.log(response.data)
      setTeams(response.data)
    }
  }
  
  useEffect(() => {
    loadTeamsHandler()
  },[])

  return (
    <>
      <h1>Vote NBA players</h1>
      <div>
        <label>Select your favorite player's team
          <h1>{error}</h1>
          <select name="selectedTeam" defaultValue="selTeam">
            <option value="selTeam">Select a team</option>
            <option value="losLakers">Los Angeles Lakers</option>
            <option value="losClippers">Los Angeles Clippers</option>
            <option value="goldWarriors">Golden State Warriors</option>
            <option value="sacKings">Sacramento Kings</option>
            <option value="houRockets">Houston Rockets</option>
            <option value="phoSuns">Phoenix Suns</option>
          </select>
        </label>
      </div>
      <button>Show players</button>
    </>
  )
}