import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Inventory from "@/components/Inventory";
export const metadata = { title: "Inventory: luxury & performance cars for sale", description: "Certified Porsche, AMG, BMW M, Ferrari, Lamborghini, Range Rover and Tesla in stock in Miami." };
export default function Page({ searchParams }: { searchParams: Record<string, string> }) {
  return (<><Nav /><main id="main" className="container-x pb-24 pt-32"><p className="kicker">Inventory</p><h1 className="h2 mt-4">Pick your weapon.</h1><div className="mt-10"><Inventory key={JSON.stringify(searchParams)} init={searchParams} /></div></main><Footer /></>);
}
