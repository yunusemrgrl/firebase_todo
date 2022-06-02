import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// CONTEXT

import { useFirebase } from './context/FirebaseContext';
// COMPONENTS

import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  const { authToken } = useFirebase();

  return (
    <Router>
      <Routes>
        {!authToken && (
          <>
            <Route path='/' element={<Navigate to={'auth'} />} />
            <Route path='auth/*' element={<PublicRoutes />} />
          </>
        )}
        {authToken && <Route path='/*' element={<PrivateRoutes />} />}
      </Routes>
    </Router>
  );
}

export default App;
