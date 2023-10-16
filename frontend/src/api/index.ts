import axios, { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
  baseURL: "http://localhost:8080"
})

export const getTeams = async (teamName?: string): Promise<AxiosResponse | null> => {
  try {
    const params = teamName ? { teamName } : { }
    const response = await client.get("/api/teams", { params })
    return response
  } catch (error) {
    return (error as AxiosError).response || null
  }
}

const PlayerSchema = z.object({
    id: z.number(),
    name: z.string()
})

const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  players: PlayerSchema.array() 
})

export type Player = z.infer<typeof PlayerSchema>
export type Team = z.infer<typeof TeamSchema>

const validateTeams = (response: AxiosResponse): Team[] | null => {
  const result = TeamSchema.array().safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

type Response<Type> = {
  data: Type
  status: number
  success: true
} | {
  status: number
  success: false
}

export const loadTeams = async (teams?: string): Promise<Response<Team[]>> => {
  const response = await getTeams(teams)
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validateTeams(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}