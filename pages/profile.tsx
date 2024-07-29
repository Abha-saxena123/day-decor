import { ProfilePage } from "@/components/user-profile/profile";
import { useSession } from "next-auth/react";


export default function Profile() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>
    }
    console.log(session, "session")
    return <ProfilePage userId={session?.token?.id as string | number} />

}