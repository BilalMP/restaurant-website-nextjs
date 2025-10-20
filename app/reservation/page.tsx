import Reservation from "@/components/Reservation";
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

const ReservationPage = async () => {
    const session = await getServerSession();

    if (!session) return redirect("/login");
    
    return (
        <>
            <Reservation />
        </>
    );
};

export default ReservationPage;
