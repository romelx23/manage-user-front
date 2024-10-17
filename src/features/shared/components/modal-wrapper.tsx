import { FC } from "react";
import { twMerge } from 'tailwind-merge'


type MaxWhidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

interface ModalWrapperProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    maxWidth?: MaxWhidth;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children, isOpen, title, maxWidth = 'md', onClose }) => {
    console.log(maxWidth);
    return (
        <>
            <div id="crud-modal" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-gray-800 bg-opacity-80 hover:cursor-pointer ${ isOpen ? '' : 'hidden' }`}
                onClick={onClose}
            >
            </div>
            <div className={twMerge(`fixed p-4 w-full max-w-xl max-h-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${ isOpen ? '' : 'hidden' }`)}>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold">
                            {title ? title : 'Modal'}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {children}
                </div>
            </div>
        </>
    )
}
