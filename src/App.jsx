import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Mapa from "./components/Mapa";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Mapa/>
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
