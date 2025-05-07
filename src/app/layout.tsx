import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer, Bounce, Flip, Slide, Zoom } from "react-toastify";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud hosting",
  description: "Cloud hosting project",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
        flex flex-col min-h-screen`}
      >
        <Header />
        <ToastContainer
          position="top-center" //! position of the toast
          autoClose={3000} //! duration in milliseconds
          hideProgressBar={false} // hide progress bar
          newestOnTop={false} // show newest toast on top
          closeOnClick // close toast on click
          rtl={false} // right to left
          limit={5} // limit the number of toast
          draggable // قابلة للسحب
          pauseOnHover // pause on hover
          theme="colored" //! theme of the toast
          transition={Bounce} //! transition of the toast by default Bounce
        />
        <main className="container mx-auto flex-grow-1 flex flex-col ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
