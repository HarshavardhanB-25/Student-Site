import Hero from "./components/Home/Hero";
import Navbar from "./components/Home/Navbar";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col ">
        <Navbar/>
        <Hero/>
    </main>
  );
}
