'use client'

import { useSession } from "next-auth/react"
import UserItem from "./userItem/userItem"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {
    Boxes,
    Group,
    HandHelping,
    LayoutDashboard,
    Pickaxe,
    Rocket,
    Settings
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"


export default function SideBar() {
    const menuItems = [
        {
            title: "Início",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <LayoutDashboard />,
                },

                {
                    title: "Multibenefícios",
                    path: "/dashboard/multibeneficios",
                    icon: <Rocket />,
                },
            ],
        },
        {
            title: "Minha equipe",
            list: [

                {
                    title: "Usuários",
                    path: "/dashboard/minha-equipe",
                    icon: <Boxes />,
                },

            ],
        },
        {
            title: "Colaboradores",
            list: [

                {
                    title: "Lista",
                    path: "/dashboard/colaboradores",
                    icon: <Pickaxe />,
                },
                {
                    title: "Grupos",
                    path: "/dashboard/colaboradores/grupos",
                    icon: <Group />,
                },


            ],
        },

        // {
        //     title: "Empresa",
        //     list: [
        //         {
        //             title: "Configurações",
        //             path: "/dashboard/configuracoes",
        //             icon: <Settings />,
        //         },
        //         {
        //             title: "Suporte",
        //             path: "/dashboard/help",
        //             icon: <HandHelping />,
        //         },
        //     ],
        // },
    ];



    return (
        <div className="fixed flex flex-col w-[80%] max-w-[300px] h-screen p-4 bg-soft ">
            <div>
                <UserItem />
            </div>
            <div className="grow ">
                <Command className=" flex h-full grow bg-soft " >
                    {/* <CommandInput placeholder="Pesquise algo..." /> */}
                    <CommandList className="grow gap-2 " >
                        {menuItems.map((cat, index) => (
                            <CommandGroup key={index} heading={cat.title} >
                                {cat.list.map((item, itemIndex) => (
                                    <Link href={item.path} key={itemIndex}>
                                        <CommandItem key={itemIndex} className="flex gap-2 cursor-pointer">
                                            {item.icon}
                                            {item.title}
                                        </CommandItem>
                                    </Link>
                                ))}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>

            </div>
            <Image src="/logo-correct.png" alt="Logo correct" height={200} width={200} />

        </div>
    )
}