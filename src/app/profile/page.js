import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 480, color: "#0f172a" }}>
      <h1 style={{ marginTop: 0 }}>Profile</h1>
      <p>
        Angemeldet als{" "}
        <strong>{session.user.username ?? session.user.email ?? "User"}</strong>
      </p>
      <p>
        <Link href="/" style={{ color: "#0369a1" }}>
          Zur Startseite
        </Link>
      </p>
    </div>
  );
}
