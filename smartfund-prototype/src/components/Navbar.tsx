import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Lightbulb, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/home', label: '首頁', icon: Home },
    { path: '/recommend', label: 'AI 推薦', icon: Lightbulb },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-bnp-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center space-x-2 sm:space-x-3 hover:opacity-90 transition-opacity"
            onClick={closeMenu}
          >
            <TrendingUp size={28} className="text-white sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl font-bold tracking-wide">
              <span className="hidden sm:inline">SmartFund 我的投資</span>
              <span className="sm:hidden">SmartFund</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-white bg-opacity-20 font-semibold' 
                      : 'hover:bg-white hover:bg-opacity-15'
                    }`}
                >
                  <Icon size={20} />
                  <span className="text-sm lg:text-base">{item.label}</span>
                </Link>
              );
            })}
            
            <Link
              to="/"
              className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-15 transition-all duration-300"
            >
              <LogOut size={20} />
              <span className="text-sm lg:text-base">登出</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-15 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-bnp-deep border-t border-white border-opacity-10 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${isActive 
                        ? 'bg-white bg-opacity-20 font-semibold' 
                        : 'hover:bg-white hover:bg-opacity-15'
                      }`}
                  >
                    <Icon size={22} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-15 transition-all duration-300 border-t border-white border-opacity-10 mt-2 pt-4"
              >
                <LogOut size={22} />
                <span>登出</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

