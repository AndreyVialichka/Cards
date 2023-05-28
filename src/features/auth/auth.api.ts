import { instance } from "common/common.api"


export const authApi = {
    registration: (payload:payloadRegistrationType) => {
        return instance.post<RegisterResponseType>('auth/register',{
            email : payload.email,
            password : payload.password
        })
    },

    login: (payload:loginPayloadType) => {
        return instance.post<LoginResponseType>('auth/login', payload)
    }
}


export type payloadRegistrationType = {
    email: string
    password : string
}

export type loginPayloadType = {
    email:string,
    password: string,
    rememberMe: boolean
}

export type RegisterResponseType = {
    addedUser: {
      _id: string;
      email: string;
      rememberMe: boolean;
      isAdmin: boolean;
      name: string;
      verified: boolean;
      publicCardPacksCount: number;
      created: string;
      updated: string;
      __v: number;
    };
  };

  export type LoginResponseType = {
    data :{
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
        token: string
        tokenDeathTime: number
    }
  }