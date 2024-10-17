import { FooterHome } from "../components/footer-home";
import { NavbarHome } from "../components/navbar-home";

interface LayoutHomeProps {
    children: React.ReactNode;
}
export const HomeLayout = ({ children }: LayoutHomeProps) => {
    return (
        <div>
            <NavbarHome />
            <main>{children}</main>
            <FooterHome />
        </div>
    )
}
