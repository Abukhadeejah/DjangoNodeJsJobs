import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { JobProvider } from '../context/JobContext';


function MyApp({ Component, pageProps }) {
  // Provide global layout or functionality here
  return (
    <AuthProvider>
        <JobProvider>
        <Component {...pageProps} />
        </JobProvider>
      
    </AuthProvider>
  
  );
}

export default MyApp;
