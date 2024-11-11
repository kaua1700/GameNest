
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/login';
import Home from './src/pages/home';
import Detail from './src/pages/Detail';
import Cadastro from './src/pages/cadastro';
import Biblioteca from './src/pages/biblioteca';
const Stack = createNativeStackNavigator();

function Routes(){
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"> 
          <Stack.Screen 
          name="Home"
          component={Home}
          options={{ headerShown: false}}
          />
          <Stack.Screen 
          name="Login"
          component={Login}
          options={{ headerShown: false}}
          /> 
          <Stack.Screen 
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false}}
          /> 
          <Stack.Screen 
          name="Detail"
          component={Detail}
          
          /> 
          <Stack.Screen 
          name="Biblioteca"
          component={Biblioteca}
          
          /> 
          
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Routes;