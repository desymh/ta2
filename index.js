import { registerRootComponent } from "expo";
import { enableScreens } from "react-native-screens";

enableScreens();

import { AuthProvider } from "./context/AuthContext";
import { AppDataProvider } from "./context/AppDataContext";
import AppNavigator from "./navigation/Navigator";

const App = () => (
  <AuthProvider>
    <AppDataProvider>
      <AppNavigator />
    </AppDataProvider>
  </AuthProvider>
);

registerRootComponent(App);