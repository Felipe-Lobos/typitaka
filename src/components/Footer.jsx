import "./styles/Footer.css";
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";


export function Footer() {
  return (
    <footer>
      <div className="info">
        <div className="repository">
          <a href="">Github </a>
          <IoCodeSlashOutline />
        </div>
{/* 
        <div className="">
          <a href="">Info</a>
        </div> */}
        <div className="developer">
          <a target="_blank" href="https://github.com/Felipe-Lobos">Felipe Lobos</a>
          <FaGithub />
        </div>
      </div>
    </footer>
  );
}
