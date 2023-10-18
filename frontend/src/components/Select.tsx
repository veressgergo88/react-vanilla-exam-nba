import { useState } from "react";
import type { Team } from "../api"

type Props = {
    error: string | null
    teams: Team[]
    selectedTeam: string
}

export default function Select({error, teams, selectedTeam}:Props) {
    
    return (
        <label>
            Select your favorite player's team
            <h1>{error}</h1>
            <select  className="select select-bordered w-full max-w-xs" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
              <option>{selectedTeam}</option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
        </label>
    )
}