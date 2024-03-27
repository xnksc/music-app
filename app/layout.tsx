import type { Metadata } from "next";
import { Figtree } from "next/font/google"; // FONT
// import { Poppins } from "next/font/google"; // FONT
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import { UserProvider } from "@/providers/UserProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";
import { getSongsById } from "@/actions/getSongsById";
import { Player } from "@/components/Player";
import { getActiveProducts } from "@/actions/getActiveProducts";
import { getPlaylists } from "@/actions/getPlaylists";
import { cn } from "@/libs/helpers";
// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en";
export const revalidate = 0;
// TimeAgo.addDefaultLocale(en);
const font = Figtree({ subsets: ["latin"] }); // FONT

export const metadata: Metadata = {
  title: "Music App",
  description: "Web music app",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsById();
  const userPlaylists = await getPlaylists();
  const products = await getActiveProducts();
  return (
    <html lang="en">
      {/* <body className={cn("select-none", font.className)}> */}
      <body className={cn("", font.className)}>
        <ToasterProvider></ToasterProvider>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}></ModalProvider>
            <Sidebar songs={userSongs} playlists={userPlaylists}>
              {children}
            </Sidebar>
            <Player playlists={userPlaylists}></Player>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
