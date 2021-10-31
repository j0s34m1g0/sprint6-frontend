import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./Login";
import Profile  from "./Profile";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="AppHome">
      <header className="AppHome-header">
        {isAuthenticated ? (
          <>           
            <Profile />
          </>
        ) : (
          <LoginButton />
        )}
      </header>
    </div>
  );
}
export default App;