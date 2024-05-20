import type { Metadata } from "next";
import {
  Figtree,
  Inter,
  Manrope,
  Montserrat,
  Raleway,
  Roboto,
  Roboto_Condensed,
  Roboto_Flex,
  Roboto_Mono,
  Roboto_Serif,
  Roboto_Slab,
  Wix_Madefor_Display,
  Wix_Madefor_Text,
  Zen_Kaku_Gothic_Antique,
  Zen_Kaku_Gothic_New,
} from "next/font/google";
import "../globals.css";
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
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
export const revalidate = 0;
// const font = Roboto({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500", "900", "100", "700"],
// }); //
const font = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "800", "200", "700"],
}); //
// const font = Zen_Kaku_Gothic_Antique({
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "500", "900", "700"],
// });
// const font = Wix_Madefor_Display({
//   subsets: ["latin", "cyrillic"],
//   weight: ["600", "400", "500", "700", "800"],
// });
// const font = Inter({
//   // GOOD
//   subsets: ["latin", "cyrillic"],
//   weight: ["300", "400", "200", "500", "800", "900", "100", "700"],
// });

export const metadata: Metadata = {
  title: "Music App",
  description: "Web music app",
};
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const userSongs = await getSongsById();
  const userPlaylists = await getPlaylists();
  const products = await getActiveProducts();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      {/* <body className={cn("select-none", font.className)}> */}
      <body className={cn("", font.className)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
