import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
function MyApp({ Component, pageProps }) {
  // Provide global layout or functionality here
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  
  );
}

export default MyApp;
