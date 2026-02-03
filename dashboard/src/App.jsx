import { AuthProvidor } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvidor>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </AuthProvidor>
  );
}

export default App;
