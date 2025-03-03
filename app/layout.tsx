import "../styles/globals.css";

export const metadata = {
  title: "BropenAI - AI for Bros",
  description: "Create your ultimate Brofile powered by AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}