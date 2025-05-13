import "./globals.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Cursor from "../../components/Cursor/Cursor";

export const metadata = {
    title: "National Students' Space Challenge",
    description: "National Students' Space Challenge - May 16-18, 2025",
};

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--dm-sans',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={dmSans.variable}>
            <body>
                <Navbar />
                {children}
                <Cursor />
                <Footer />
            </body>
        </html>
    );
}
