import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/Login";
import Cadastro from "../screen/login/Cadastro";
import Contatos from "../screen/contatos/Contatos";
import Chat from "../screen/chat/Chat";
import Info from "../screen/login/Info";
import Bottom from "./bottom.routes";
import EditarPerfil from "../screen/editarPerfil/EditarPerfil";
import RedefinirSenha from "../screen/editarPerfil/RedefinirSenha";
import ExcluirConta from "../screen/editarPerfil/ExcluirConta";
import Colecao from "../screen/colecao/Colecao";
import PostExpandido from "../screen/post/PostExpandido";
import PesquisaPalavraChave from "../screen/pesquisa/PesquisaPalavraChave";
import NovoPost from "../screen/post/NovoPost";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const { Screen, Navigator } = createStackNavigator();

export default function Stack() {
  const {autentication} = useAuthContext()
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checarAutenticacao = async () => {
      const authStatus = await AsyncStorage.getItem('autentication');
      setAutenticado(authStatus === 'true');
      setLoading(false);
    };
    
    checarAutenticacao();
  }, [autentication]);

  // Enquanto está carregando, exibe um indicador de carregamento
  if (loading) {
    return <Loading isOpen={loading}/>
  }

  return (
    <Navigator>
      {autenticado ? (
        <>
          <Screen name="tabs" component={Bottom} options={{ headerShown: false }} />
          <Screen name="chat" component={Chat} options={{ headerShown: false,  }} />
          <Screen name="contatos" component={Contatos} options={{ headerShown: false }} />
          <Screen name="editar" component={EditarPerfil} options={{ headerShown: false }} />
          <Screen name="redefinir" component={RedefinirSenha} options={{ headerShown: false }} />
          <Screen name="excluir" component={ExcluirConta} options={{ headerShown: false }} />
          <Screen name="colecao" component={Colecao} options={{ headerShown: false }} />
          <Screen name="expandido" component={PostExpandido} options={{ headerShown: false }} />
          <Screen name="novoPost" component={NovoPost} options={{ headerShown: false }} />
          <Screen name="pesquisaPalavraChave" component={PesquisaPalavraChave} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Screen name="login" component={Login} options={{ headerShown: false }} />
          <Screen name="cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Screen name="info" component={Info} options={{ headerShown: false }} />
        </>
      )}
    </Navigator>
  );
}
