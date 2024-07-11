'use client'

import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AccountBalance() {
    const [showBalance, setShowBalance] = useState(false);

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    return (
        <Card className="w-full md:min-w-[350px] max-w-[350px] h-[200px] font-bold bg-text text-bg justify-between">
            <CardHeader className="flex justify-between w-full">
                <div>
                    <CardTitle>Conta Correct</CardTitle>
                    <CardDescription>Saldo</CardDescription>
                </div>

            </CardHeader>
            <div className="px-7 flex flex-row gap-3 justify-between">
                <div className='flex flex-col gap-2'>
                    <h1 className="md:text-3xl">
                        {showBalance ? 'R$ 15000,00' : '*********'}
                    </h1>
                    <div>
                        <p>Pendente</p>
                        <p>{showBalance ? 'R$ + 9000,00' : '*********'}</p>
                    </div>
                </div>
                <button onClick={toggleBalanceVisibility} className="text-xl">
                    {showBalance ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </Card>
    );
}