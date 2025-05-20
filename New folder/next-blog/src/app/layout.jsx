import './globals.css';
import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  weight: ['200', '400', '600'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <header>
          <NavBar />
        </header>

        <main className="min-h-screen p-10">{children}</main>

        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
