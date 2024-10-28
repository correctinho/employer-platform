'use client'

import { useSession } from "next-auth/react"

export default function UserItem() {

    const session = useSession()

    return (
        <div className="flex items-start justify-center gap-2 border rounded-[8px] p-2">
            <div className="avatar  rounded-full min-h-12 min-w-12 bg-emerald-500 text-white font-[700]
            flex items-center justify-center
            ">
              {session?.data?.user.name &&
                <p>{session.data?.user.name?.split(' ')[0].split('')[0]}{session.data?.user.name?.split(' ')[1].split('')[0]}</p>

              }
            </div>
            <div className="grow">
                <p className="text-[16px] font-bold">{session.data?.user.user_name ? session.data?.user.user_name : session.data?.user.name ? session.data?.user.name : "Sem nome"}</p>
                <p className="text-[12px] text-neutral-500">{session.data?.user.is_admin ? "Admin" : ""}</p>
            </div>
        </div>
    )
}
