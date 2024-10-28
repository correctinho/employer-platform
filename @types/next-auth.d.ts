import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
          uuid: string
          business_info_id: string
          is_admin: boolean
          document: string | null
          user_name: string | null
          email: string | null
          img: string | null
          name: string | null
          permissions: string[]
          function: string | null
          token: string
          status: string
          business_status: string

        }
    }
}
