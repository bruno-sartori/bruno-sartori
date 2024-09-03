"use client";

import { Inter } from "next/font/google";
import { SITE } from "@/consts";
import { MainContextProvider } from "./hooks/mainContext";
import Head from "@/components/Head";
import Header from "@/components/Header";
import PageFind from "@/components/PageFind";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  title,
  description,
  children,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  description: string;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Head title={`${title} | ${SITE.TITLE}`} description={description!} url='teste' site="http://localhost:3000" />
        <MainContextProvider>
          <>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
            <PageFind />
          </>
        </MainContextProvider>
      </body>
    </html>
  );
}
