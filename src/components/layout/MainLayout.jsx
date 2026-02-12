import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

const MainLayout = ({ children, noPadding = false }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-bg-main overflow-hidden transition-colors duration-500">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
                <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className={clsx(
                    "flex-1 overflow-hidden scroll-smooth",
                    !noPadding && "px-6 py-12 sm:px-10 lg:px-16"
                )}>
                    <motion.div
                        className={clsx(noPadding && "h-full")}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
