import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await verifySession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 480, color: "#e2e8f0" }}>
      <h1 style={{ marginTop: 0, color: "#fff" }}>Profile</h1>
      <p>
        Angemeldet als{" "}
        <strong>{session.user.username ?? session.user.email ?? "User"}</strong>
      </p>
      <p>
        <Link href="/" style={{ color: "#5eead4" }}>
          Zur Startseite
        </Link>
      </p>
    </div>
  );
}
