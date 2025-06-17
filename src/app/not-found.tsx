import Image from "next/image";
import Link from "@/components/Link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <Image
        src="/favicon.ico"
        alt="Aquarium Favicon"
        width={64}
        height={64}
        style={{ marginBottom: 24 }}
      />
      <h1 style={{ fontSize: "3rem", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.5rem", margin: "16px 0" }}>
        Oops! Looks like this page swam away 🐟
      </p>
      <p>
        Maybe it’s hiding behind some coral?
        <br />
        <Link href="/" className="text-cyan-500 underline">
          Go back to the aquarium
        </Link>
      </p>
    </div>
  );
}
