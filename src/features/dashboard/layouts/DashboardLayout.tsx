import React, { FC, useEffect, useState } from 'react'
import { SidebarDashboard } from '../components/sidebar-dashboard'
import { NavbarDashboard } from '../components/navbar-dashboard'
import { useUiStore } from '../store/uiStore'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const { isOpen } = useUiStore();

    const [theme, setTheme] = useState('light'); // Tema por defecto

    useEffect(() => {
        // Cargar el tema desde localStorage al iniciar la aplicación
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            const defaultTheme = 'light';
            setTheme(defaultTheme);
            document.documentElement.setAttribute('data-theme', defaultTheme);
        }
        console.log(theme);
    }, []);

    return (
        <div>
            <NavbarDashboard />
            <SidebarDashboard />
            <div className={`${ isOpen ? 'md:pl-56' : 'pl-0' }`}>
                {children}
            </div>
        </div>
    )
}
