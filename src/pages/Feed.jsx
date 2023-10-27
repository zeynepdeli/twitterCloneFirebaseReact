import Aside from "../components/Aside";
import Main from "../components/Main";
import Nav from "../components/Nav";

const Feed = () => {
  return (
    <section className="grid grid-cols-4 h-screen bg-black text-white">
      <Nav />
      <Main />
      <Aside />
    </section>
  );
};

export default Feed;
