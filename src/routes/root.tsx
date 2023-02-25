import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import RepoLists from "../components/RepoLists";

const Root = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RepoLists/>
    </div>
  );
};

export default Root;
