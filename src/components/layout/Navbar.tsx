import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, MenuIcon, UserIcon, XIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? 'text-primary-700 bg-primary-50'
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }`;

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <BriefcaseIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">JobQuest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/jobs" className={navLinkClasses}>
              Jobs
            </NavLink>
            
            {isAuthenticated && user?.role === 'jobSeeker' && (
              <NavLink to="/applications" className={navLinkClasses}>
                My Applications
              </NavLink>
            )}
            
            {isAuthenticated && user?.role === 'employer' && (
              <NavLink to="/employer" className={navLinkClasses}>
                Dashboard
              </NavLink>
            )}
            
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className={navLinkClasses}>
                  Profile
                </NavLink>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="primary" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to="/jobs"
              className={navLinkClasses}
              onClick={closeMobileMenu}
            >
              Jobs
            </NavLink>
            
            {isAuthenticated && user?.role === 'jobSeeker' && (
              <NavLink
                to="/applications"
                className={navLinkClasses}
                onClick={closeMobileMenu}
              >
                My Applications
              </NavLink>
            )}
            
            {isAuthenticated && user?.role === 'employer' && (
              <NavLink
                to="/employer"
                className={navLinkClasses}
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
            )}
            
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  className={navLinkClasses}
                  onClick={closeMobileMenu}
                >
                  Profile
                </NavLink>
                <button
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    navigate('/login');
                    closeMobileMenu();
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    navigate('/register');
                    closeMobileMenu();
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;