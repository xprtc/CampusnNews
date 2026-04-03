import "./globals.css";
import Header from "@/components/Header"; // Importiert deinen neuen Header

export const metadata = {
  title: "Campus News",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header /> 
        <main>
          {children} 
        </main>
      </body>
    </html>
  );
}