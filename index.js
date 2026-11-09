import { registerRootComponent } from "expo";
import { enableScreens } from "react-native-screens";

enableScreens();

import { AuthProvider } from "./context/AuthContext";
import AppNavigator from "./navigation/Navigator";

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

registerRootComponent(App);