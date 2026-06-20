import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { LeadProvider } from './context/LeadContext';
import { ThemeProvider } from './context/ThemeContext';

/**
 * App Component
 * Root component of the Startup CRM Lite application.
 * Integrates React Router DOM's BrowserRouter context and wraps route mapping in Theme & Lead Providers.
 *
 * @returns {React.JSX.Element} The root application layout.
 */
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LeadProvider>
          <AppRoutes />
        </LeadProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
