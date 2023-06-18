import { instance } from "common/common.api"



export const authApi = {
    registration: (payload:payloadRegistrationType) => {
        return instance.post<RegisterResponseType>('https://neko-back.herokuapp.com/2.0/auth/register',{
            email : payload.email,
            password : payload.password
        })
    },

    login: (payload:loginPayloadType) => {
        return instance.post<profileType>('auth/login', payload)
    },

    logout: () => {
        return instance.post('/auth/me')
    },

    forgorPassport: (payload:payloadForgotPassportType) => {
        return instance.post('https://neko-back.herokuapp.com/2.0/auth/forgot',payload)
    },
    setNewPassport: (payload:payloadNewPassportType) => {
        return instance.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password',payload)
    }

}

export type payloadNewPassportType = {
    password:string,
    resetPasswordToken:string

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

export type payloadForgotPassportType = {
    email: string,
    from? : string,
    message: string
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

  export type profileType = {
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


export  const MESSAGE_FOR_FOGGOTEN_PASSPORT =  `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/SetNewPassportPage/$token$'>
link</a>
</div>`
