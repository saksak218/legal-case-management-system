import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-max">
        <SignIn />
      </div>
    </div>
  );
}
