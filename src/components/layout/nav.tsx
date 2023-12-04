import Link from "next/link";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ weight: 'variable', subsets: ["latin"]});

export default function Nav() {
    return (
        <nav className={`w-40 min-h-screen border-r ${orbitron.className} text-lg font-bold pt-8 text-center bg-slate-100 text-slate-800 uppercase shadow-inner`}>
          <ul>
            <li>
              <Link href={"/day/1"} className={`block my-4 mx-6`}>Day 1</Link>
            </li>
            <li>
              <Link href={"/day/2"} className={`block my-4 mx-6`}>Day 2</Link>
            </li>
            <li>
              <Link href={"/day/3"} className={`block my-4 mx-6`}>Day 3</Link>
            </li>
            <li>
              <Link href={"/day/4"} className={`block my-4 mx-6`}>Day 4</Link>
            </li>
          </ul>
        </nav>
    )
}