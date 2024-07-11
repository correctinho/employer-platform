'use client'

import { useRouter } from 'next/navigation'
import styles from './backButton.module.css'

import Link from 'next/link';

import { IoMdArrowBack } from "react-icons/io";



const BackButton = () => {
    const router = useRouter()
    const getPreviousPath = () => {
        return router.back();
    };

    return (
        <div className={styles.container}>
            <div onClick={getPreviousPath}>
                <IoMdArrowBack />
                <p>Voltar</p>
            </div>
        </div>
    )
}

export default BackButton