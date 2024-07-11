import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthWrapper from "./auth_wrapper";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Correct - Plataforma Empregador",
  description: "Desenvolvido pela Correct",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          {children}
          <ToastContainer autoClose={2000} />

        </AuthWrapper>

      </body>
    </html>
  );
}
