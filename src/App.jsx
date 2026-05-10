import Navbar from './Navbar.jsx';
import Intro from './Intro.jsx';
import Profile from './Profile.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <Profile />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
