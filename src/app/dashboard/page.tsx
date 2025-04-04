import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return <p>You must be logged in</p>
    }

    return (
        <div>
            <h1>Welcome {session.user?.name}</h1>
            <p>Your tenant: {session.user?.name} ({session.user?.email})</p>
        </div>
    )
}
