import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <SignUp path="/register" routing="path" signInUrl="/login" />
    </main>
  );
}