import Head from "next/head";
import Link from "next/link";
import Image from "next/image"; // Move the import statement here
import { api } from "@/utils/api";


export default function Home() {
    const hello = api.post.hello.useQuery({ text: "from tRPC" });

    return (
        <>
        <div>
            <h1 style={{ marginTop: '200px' }}></h1>
        </div>
        
            <Head>
                <title>Choose A Game</title>
                <style>{`
                    h1 {
                        font-family: Arial, sans-serif;
                    }
                    .play-button {
                        font-family: Arial, sans-serif;
                    }
                `}</style>
            </Head>
            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem] flex justify-center items-center">
                <span className="mr-4">Choose A Game</span>
            </h1>
            
            <div className="flex justify-center items-center" style={{ marginTop: '50px' }}>
                <Link href="/reaction" legacyBehavior>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded play-button" style={{ marginRight: '25px' }}>
                        Reaction Time
                    </a>
                </Link>
                <Link href="/aiming" legacyBehavior>
                    <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded play-button" style={{ marginRight: '25px' }}>
                        Aiming Test
                    </a>
                </Link>
                <Link href="/memory" legacyBehavior>
                    <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded play-button" style={{ marginRight: '25px' }}>
                        Memory Test
                    </a>
                </Link>
            </div>
        </>
    );
}
