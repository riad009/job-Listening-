import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/shared/Navbar";
import Footer from "./component/shared/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JobPortal - Find Your Dream Job",
  description: "Connect with top companies and discover thousands of job opportunities. The leading marketplace for professional careers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
