import {Menubar} from "primereact/menubar";
import Logo from "../Logo/Logo";
import Profile from "../Profile/Profile";

const NavBar = () => {

    const items = [
        {
            label: 'Charts',
            icon: 'pi pi-fw pi-chart-bar',
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
        },
    ];

    const logo = <Logo />;
    const end = <Profile />;

    return (
        <div>
            <Menubar model={items} start={logo} end={end} />
        </div>
    )
}

export default NavBar;