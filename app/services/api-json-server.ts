'use server'

import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/AuthTokenError";
import { auth } from "../lib/auth";


const baseURL = 'http://localhost:3300'

export async function setupAPIClientJSONServer(ctx = {}) {


    const session = await auth()

    const apiJsonServer = axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${session?.user?.token}`
        }
    })
    apiJsonServer.interceptors.response.use(response => {

        return response
    }, async (error: AxiosError) => {
        //console.log("error axios: ", error)
        if (error.response?.status === 401) {
            if (typeof window !== undefined) {
                
                return Promise.reject(new AuthTokenError)
            }
            else {
                console.log('caiu aqui 2')
                return Promise.reject(new AuthTokenError)
            }


        }

        return Promise.reject(error)
    })

    return apiJsonServer
}