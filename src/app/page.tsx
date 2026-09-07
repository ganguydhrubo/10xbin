import HeroScrubber from '@/components/HeroScrubber';
import BentoProfile from '@/components/BentoProfile';
import TechStack from '@/components/TechStack';
import ProjectsMatrix from '@/components/ProjectsMatrix';
import LiveDispatchTerminal from '@/components/LiveDispatchTerminal';
import Footer from '@/components/Footer';
export default function Home(){return <main><nav className="nav"><a className="brand" href="#" aria-label="10xbin home">10xbin<span>®</span></a><div className="nav-links"><a href="#architecture">Architecture</a><a href="#deployments">Deployments</a><a href="#stack">Runtime stack</a></div><a className="nav-cta" href="#dispatch">Establish connection <span>↗</span></a></nav><HeroScrubber/><BentoProfile/><TechStack/><ProjectsMatrix/><LiveDispatchTerminal/><Footer/></main>}
