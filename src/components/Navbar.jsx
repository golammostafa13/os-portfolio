import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";

const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="Logo" />
                <p className="font-bold">Golam Mostafa's Portfolio</p>
                <ul>
                    {
                        navLinks.map((link) => (
                            <li key={link.id}>{link.name}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <ul>
                    {
                        navIcons.map((icon) => (
                            <li key={icon.id}>
                                <img src={icon.img} alt={`icon-${icon.id}`} />
                            </li>
                        ))
                    }
                </ul>
                <time>
                    {dayjs().format("ddd MMM D h:mm A")}
                </time>
            </div>
        </nav>
    );
};
export default Navbar;