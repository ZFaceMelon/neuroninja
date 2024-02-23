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
        <title>Neuro Ninja</title>
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
        <span className="mr-4">Neuro Ninja</span>
        <Image
          src="/Ninja_Tech_logo_template-removebg-preview.png"
          alt="Ninja"
          width={500} // Increase the width to 96
          height={500} // Increase the height to 96
          className="w-12 h-12 animate-bounce"
        />
      </h1>
      
      <div className="flex justify-center items-center" style={{ marginTop: '50px' }}>
        <Link href="/menu" legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded play-button">
            Play
          </a>
        </Link>
      </div>
    </>
  );
}
