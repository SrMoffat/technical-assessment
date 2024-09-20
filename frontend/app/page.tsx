import { Button, Flex } from 'antd';
import Image from "next/image";
import Link from "next/link";
import { Background, LogoWord, World } from "./components/atoms/Icon";


export function Box() {
  //  bg-dark-purple text-white  md:px-14 md:py-12 lg:p-16 flex flex-col gap-4 relative

  // font-fraunces wonky  font-semibold lg:text-[3.5rem]  md:text-start
  return (
    <div className="p-8 mt-12">
      <h1 className="text-[2rem] text-center font-semibold">Seamless and Efficient Data Handling</h1>
      <p className="font-manrope text-center md:text-start">
        Submit source and target files for reconciliation after data normalization to handle potential data transformation issues. Identify records present in source but missing in target and vice versa for accurate records.
      </p>
    </div>
  );
}

interface EnumerableProps {
  index: number;
  title: string;
  content: string;
}

export function Enumerable(props: EnumerableProps) {
  return (
    <div className="flex flex-col items-center py-10 gap-6 md:flex-row md:px-24 lg:flex-col">
      <div className="rounded-full h-12 w-12 border border-white flex items-center justify-center font-fraunces">{props.index}</div>
      <div className="flex flex-col items-center gap-4 px-4 md:items-start md:max-w-[520px] lg:max-w-full lg:items-center lg:px-0">
        <h1 className="font-fraunces wonky text-[28px] font-semibold leading-[36px]">{props.title}</h1>
        <p className="text-davys-grey font-manrope font-normal leading-[28px] text-center md:text-start lg:text-center">{props.content}</p>
      </div>
    </div>
  )
}


function LandingPageHeader() {
  return (
    <header className="">
      <nav className='flex items-center justify-between px-4 md:px-10 lg:px-40 lg:pt-14 pt-8'>
        <div className="relative flex items-center h-[40px] w-[170px]">
          <Image src={LogoWord} alt="Reconcili8" fill />
        </div>
        <div>
          <Link className="hover:text-[#7078e8]" href="/login">Login</Link>
          <Link href="/register">
            <Button className="ml-4" type="primary">Register</Button>
          </Link>
        </div>
      </nav>
      <h1 className="text-white text-[40px] md:text-[50px] lg:text-[80px] font-fraunces leading-[50px] lg:leading-[80px]  w-full text-center font-semibold mt-16 md:mt-14 lg:mt-14">
        <span className="underline">Reconciliate</span> financial <br />
        records with <span className="underline">ease</span>.
      </h1>
      <Flex className="justify-center mt-12 md:text-red-500">
        <Link href="/reconcile">
          <Button size="large" className="ml-4" type="primary">Start Reconciliation</Button>
        </Link>
      </Flex>
    </header>
  )
}

function LandingPageContent() {
  const items = [
    {
      index: 1,
      title: 'Data Normalization',
      content: 'Handles potential data transformation issues with date formats, case sensitivity, leading/trailing spaces, among others.'
    },
    {
      index: 2,
      title: 'Records Reconciliation',
      content: 'Handles automated record reconciliation to identify missing records, discrepancies, and other validation errors that occur.'
    },
    {
      index: 3,
      title: 'Multi-Layered Approach',
      content: 'Reconcialiation and validation checks happen on the client-side and server-side to ensure optimum experience and accurancy.'
    }
  ]

  return (
    <main className="pt-20">
      <div className="bg-ghost-white flex flex-col lg:flex-row pt-[40px]">
        {items.map((item) => (<Enumerable key={item.index} {...item} />))}
      </div>
      <div className="mt-8 flex flex-col items-center px-4 justify-center pt-10 ">
        <div className="relative w-[360px] h-[280px]  sm:w-[640px] sm:h-[320px] md:w-[768px] md:h-[320px]">
          <Image src={World} alt="background" fill />
        </div>
        <div className=''>
          <Box />
        </div>
      </div>
    </main>

  )
}

function LandingPageFooter() {
  return (
    <footer className='flex flex-col items-center gap-2 py-20'>
      <div className='relative h-[24px] w-[120px]'>
        <Image src={LogoWord} alt="Reconcili8" fill />
      </div>
      <div className='flex justify-between'>
        {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <LandingPageHeader />
      <LandingPageContent />
      <LandingPageFooter />
    </>
  );
}
