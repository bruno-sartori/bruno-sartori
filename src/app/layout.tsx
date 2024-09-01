"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/consts";
import Head from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageFind from "@/components/PageFind";

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
    <head>
      <Head title={`${title} | ${SITE.TITLE}`} description={description!} url='teste' site="http://localhost:3000" />
    </head>
    <body className={inter.className}>
      <Header />
      {children}
      {/*<Footer />
      <PageFind />*/}
    </body>
  </html>
  );
}
