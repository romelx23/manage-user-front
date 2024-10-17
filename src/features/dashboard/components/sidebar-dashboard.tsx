// import { Link } from 'react-router-dom'
import { useUiStore } from '../store/uiStore'
import { useAuthStore } from '../../auth/store/authStore';
import { ActiveLink } from './active-link';
import { useNavigate } from 'react-router-dom';

export const SidebarDashboard = () => {
    const { isOpen, toggle } = useUiStore();
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const role = user?.role;

    const adminRoutes = [
        {
            path: '',
            label: 'Dashboard',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>,
        },
        {
            path: 'ambiente',
            label: 'Ambiente',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-category"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h6v6h-6z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6h-6z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>,
        },
        {
            path: 'catalogos',
            label: 'Catalogos',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>,
        },
        {
            path: 'usuarios',
            label: 'Usuarios',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>,
        },
    ];

    const ambientRoutes = [
        {
            path: '',
            label: 'Dashboard',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>,
        },
        {
            path: 'ambiente',
            label: 'Ambiente',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>,
        },
    ];

    const catalogRoutes = [
        {
            path: '',
            label: 'Dashboard',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>,
        },
        {
            path: 'catalogos',
            label: 'Catalogos',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>,
        },
    ];

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    }

    return (
        <>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                onClick={toggle}
                type="button"
                className="fixed bottom-10 right-10 inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 border z-50 bg-gray-800 transition-colors duration-200"
            //   (click)="toggleSidebar()"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="sidebar"
                className={`${ isOpen ? 'translate-x-0' : '-translate-x-full' } fixed top-16 left-0 z-40 w-56 h-screen transition-transform shadow-lg shadow-gray-700`}
                aria-label="Sidebar"
            >
                {/* <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900"> */}
                <div className="h-full px-3 py-4 overflow-y-auto sidebar-color transition-colors">
                    <ul className="space-y-2 font-medium">
                        {
                            role === 'ADMIN_ROLE' && (
                                adminRoutes.map((route, index) => (
                                    <li key={index}>
                                        <ActiveLink
                                            to={`/dashboard/${ route.path }`}
                                        >
                                            {
                                                route.icon
                                            }
                                            <span className="ms-3">{route.label}</span>
                                        </ActiveLink>
                                    </li>
                                ))
                            )
                        }
                        {
                            role === 'AMBIENT_ROLE' &&
                            (
                                ambientRoutes.map((route, index) => (
                                    <li key={index}>
                                        <ActiveLink
                                            to={`/dashboard/${ route.path }`}
                                        >
                                            {
                                                route.icon
                                            }
                                            <span className="ms-3">{route.label}</span>
                                        </ActiveLink>
                                    </li>
                                ))
                            )
                        }
                        {
                            role === 'CATALOG_ROLE' &&
                            (
                                catalogRoutes.map((route, index) => (
                                    <li key={index}>
                                        <ActiveLink
                                            to={`/dashboard/${ route.path }`}
                                        >
                                            {
                                                route.icon
                                            }
                                            <span className="ms-3">{route.label}</span>
                                        </ActiveLink>
                                    </li>
                                ))
                            )
                        }

                        <li>
                            <button
                                onClick={() => {
                                    handleLogout();
                                }}
                                className="w-full
                                flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        stroke-width="2"
                                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                    />
                                </svg>
                                <span className="ms-3 whitespace-nowrap">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside >

        </>
    )
}
