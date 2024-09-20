import WorldMapSvg from './components/shared/atoms/WorldMap';
import { LandingPageExtra, LandingPageFooter, LandingPageHeader, LandingPageService } from './components/specific/landing';

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
        {items.map((item) => (<LandingPageService key={item.index} {...item} />))}
      </div>
      <div className="mt-8 flex flex-col items-center px-4 justify-center pt-10 ">
        <WorldMapSvg />
        <LandingPageExtra />
      </div>
    </main>

  )
}

function UnauthenticatedLayout(props: any) {
  const { children, hasHero } = props
  return (
    <>
      <LandingPageHeader hasHero={hasHero} />
      {children}
      <LandingPageFooter />
    </>
  )
}

export default function LandingPage() {
  return (
    <UnauthenticatedLayout hasHero>
      <LandingPageContent />
    </UnauthenticatedLayout>
  );
}
