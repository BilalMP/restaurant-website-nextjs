import { getServerSession } from '@/lib/get-session'
import { redirect } from 'next/navigation';
import CheckoutClient from '@/components/CheckoutClient'

const CheckOutPage = async () => {
    const session = await getServerSession();
    if(!session){
        redirect("/login?redirect=checkout");
    } 
    return <CheckoutClient />
}

export default CheckOutPage
