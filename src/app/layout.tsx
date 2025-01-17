import React from "react";
import Nav from "./components/Nav/Nav";
import Provider from "./components/Provider/Provider";
import "./styles/global.css";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TanstackProvider from "./components/Provider/TanstackProvider";

export const metadata: Metadata = {
  title: "Cook's Compass",
  description: "Navigating the Culinary World",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true} className="h-full scroll-smooth">
        <Provider session={session}>
          <TanstackProvider>
            <main className="app">
              <Nav />
              {children}
              <SpeedInsights />
            </main>
          </TanstackProvider>
        </Provider>
      </body>
    </html>
  );
}
