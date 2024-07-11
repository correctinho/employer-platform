import AccountBalance from "@/components/AccountBalance/accountBalance";
import LastTransactions from "@/components/LastTransactions/lastTransactions";
import LoadingComp from "@/components/LoadingComponent/loadingComp";
import { Suspense } from "react"

import { BiTransferAlt } from "react-icons/bi"
import { MdBlock } from "react-icons/md"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default async function Dashboard() {

    return (


        <Suspense fallback={<LoadingComp />}>
            <main className="flex flex-col gap-5">
                <div className="lg:flex">
                    <AccountBalance />
                    <div className="w-full flex items-center justify-around">
                        <div className="bg-text text-bg w-[250px] flex justify-center items-center h-[100px] rounded-md cursor-pointer hover:bg-textSoft gap-3">
                            <BiTransferAlt className="text-2xl" />
                            <span>Transferir</span>
                        </div>
                        <div className="bg-text text-bg w-[250px] flex justify-center items-center h-[100px] rounded-md cursor-pointer hover:bg-textSoft gap-3">
                            <MdBlock className="text-2xl" />
                            <span>Bloquear Cartão</span>
                        </div>
                        <div className="bg-text text-bg w-[250px] flex justify-center items-center h-[100px] rounded-md cursor-pointer hover:bg-textSoft gap-3">
                            <HiOutlineAdjustmentsHorizontal className="text-2xl"/>
                            <span>Limites</span>
                        </div>
                        
                    </div>
                </div>
                <LastTransactions />
            </main>
        </Suspense>

    )
}