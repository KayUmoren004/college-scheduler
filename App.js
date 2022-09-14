import { SafeAreaProvider } from "react-native-safe-area-context";
import { FirebaseProvider } from "./src/helpers/FirebaseContext";
import { UserProvider } from "./src/helpers/UserContext";
import Router from "./src/routes/Router";

const App = () => {
  return (
    <SafeAreaProvider>
      <FirebaseProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </FirebaseProvider>
    </SafeAreaProvider>
  );
};

// TODO: Fix issue of not real time updates

export default App;
