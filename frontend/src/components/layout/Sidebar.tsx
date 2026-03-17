import { NavLink } from "react-router-dom";
import ButtonSignout from "../buttons/ButtonSignout";

const navItems = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/analytics", label: "Analytic Report"},
    { to: "/admin/settings", label: "Settings" }
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold">PAWS Admin</h1>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg transition-colors ${
                                        isActive
                                            ? "bg-gray-700 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <ButtonSignout />
            </div>
        </aside>
    );
};

export default Sidebar;