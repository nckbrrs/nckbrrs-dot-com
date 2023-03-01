import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";

const NotFound: React.FC = () => {
    const router = useRouter();
    const [secondsOnPage, setSecondsOnPage] = useState(0);
    const secondsToWaitBeforeRerouting = 5;

    useEffect(() => {
        setTimeout(() => {
            setSecondsOnPage(secondsOnPage + 1)
        }, 1000)
        
        if (secondsOnPage >= secondsToWaitBeforeRerouting) {
            router.push('/')
        }
    }, [secondsOnPage])
    
    return (
        <>
        <Head>
            <title>Nick Barrs / 404</title>
        </Head>
        <div>
            <h1>Oops!</h1>
            <p>In {secondsToWaitBeforeRerouting - secondsOnPage} seconds, you will be navigated to the <Link href="/">home page.</Link></p>
        </div>
        </>
    )
}

export default NotFound;