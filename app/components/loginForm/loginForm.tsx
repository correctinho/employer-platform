"use client";

import styles from '../../page.module.css';
import { z } from 'zod';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RiLockPasswordFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi2";
import { MdAlternateEmail } from "react-icons/md";
import Image from 'next/image';
import { ButtonComp } from '@/components/FormsInput/Button/button';
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@/components/FormsInput/formsInput';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const { business_document, credential, password } = Object.fromEntries(formData);
    if (!business_document || !credential || !password) {
      alert("Preencha tudo");
      setLoading(false);
      return;
    }

    let emailValue = '';
    let user_name = '';

    const emailValidation = z.string().email().safeParse(credential);
    if (emailValidation.success) {
      emailValue = emailValidation.data;
    } else {
      user_name = credential as string
    }

    try {
      const result = await signIn('credentials', {
        business_document,
        email: emailValue,
        user_name,
        password,
        redirect: false
      });

      if (result?.error) {
        toast.error("Erro ao realizar o login");
        setLoading(false);
        return;
      }

      router.replace('/dashboard');
    } catch (err) {
      toast.error("Erro ao realizar o login");
      setLoading(false);
      console.log("Login error: ", err);
    }
  }, [router]);

  return (
    <>
      <main className={styles.containerCenter}>
        <div className={styles.backGround}></div>
        <section className={styles.login}>
          <div className={styles.logoTop}>
            <h2>SysCorrect</h2>
            <h3>Plataforma Empregador</h3>
          </div>

          <form onSubmit={login} className={styles.formLogin}>
            <h1>Faça seu login</h1>

            <section className={styles.containerInputsLogin}>
              <div className={styles.inputLogin}>
                <label htmlFor="document">
                  <HiIdentification size={25} />
                </label>
                <Input
                  type="text"
                  name="business_document"
                  placeholder='CNPJ / CPF'
                  required
                />
              </div>
              <div className={styles.inputLogin}>
                <label htmlFor="credentials">
                  <MdAlternateEmail size={25} />
                </label>
                <Input
                  type="text"
                  name="credential"
                  placeholder='Email ou nome de usuário'
                  required
                />
              </div>
              <div className={styles.inputLogin}>
                <label htmlFor="password">
                  <RiLockPasswordFill size={25} />
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder='Senha'
                  required
                />
              </div>
            </section>

            <div className={styles.forgetPass}>
              <span>
                <a href="#">Esqueci minha senha</a>
              </span>
            </div>

            <ButtonComp loading={loading} style={{ width: '100%' }}>
              Entrar
            </ButtonComp>
          </form>

          <Link href="/signup" className={styles.text}>Não possui conta? Cadastre-se</Link>

          <div className={styles.logoBottom}>
            <Image src='/logo-correct.png' height={200} width={200} alt='Logo Correct' />
          </div>
        </section>
      </main>
    </>
  );
}