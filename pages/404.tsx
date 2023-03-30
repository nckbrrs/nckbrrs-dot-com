import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import { Col } from "../components/base";
import 'twin.macro';


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
        <Col tw="h-full justify-center items-center">
            <p tw="w-full font-bold text-left">404 – There's nothing here!</p>
            <p tw="w-full">In {secondsToWaitBeforeRerouting - secondsOnPage} seconds, you will be navigated to my <Link href="/">home page.</Link></p>
        </Col>
        </>
    )
}

export default NotFound;