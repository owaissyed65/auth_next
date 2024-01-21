import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingPage = async () => {
  const sessions = await auth();
  return (
    <div>
      {JSON.stringify(sessions)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">SignOut</Button>
      </form>
    </div>
  );
};

export default SettingPage;
