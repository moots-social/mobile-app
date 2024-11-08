import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/login/LoginScreen";
import Cadastro from "../screen/login/CadastroScreen";
import Info from "../screen/login/InfoScreen";
import Bottom from "./bottom.routes";
import EditarPerfil from "../screen/editarPerfil/EditarPerfilScreen";
import RedefinirSenha from "../screen/editarPerfil/RedefinirSenhaScreen";
import ExcluirConta from "../screen/editarPerfil/ExcluirContaScreen";
import Colecao from "../screen/colecao/ColecaoScreen";
import PostExpandido from "../screen/post/PostExpandidoScreen";
import PesquisaPalavraChave from "../screen/pesquisa/PesquisaPalavraChaveScreen";
import NovoPost from "../screen/post/NovoPostScreen";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Loading from "../components/geral/Loading";
import PerfilOutroUsuario from "../screen/perfil/PerfilOutroUsuarioScreen";
import { getAnyItemStorage } from "../utils/storageUtils";

const { Screen, Navigator } = createStackNavigator();

export default function Stack() {
  const {auth} = useAuthContext()
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checarAutenticacao = async () => {
      const authStatus = await getAnyItemStorage('auth');
      setAutenticado(authStatus === 'true');
      setLoading(false);
    };
    
    checarAutenticacao();
  }, [auth]);

  
  if (loading) {
    return <Loading isOpen={loading}/>
  }

  return (
    <Navigator>
      {autenticado ? (
        <>
        <Screen name="tabs" component={Bottom} options={{ headerShown: false }} />
        <Screen name="expandido" component={PostExpandido} options={{ headerShown: false }} />
        <Screen name="novoPost" component={NovoPost} options={{ headerShown: false }} />
        <Screen name="pesquisaPalavraChave" component={PesquisaPalavraChave} options={{ headerShown: false }} />
        <Screen name="editar" component={EditarPerfil} options={{ headerShown: false }} />
        <Screen name="redefinir" component={RedefinirSenha} options={{ headerShown: false }} />
        <Screen name="excluir" component={ExcluirConta} options={{ headerShown: false }} />
        <Screen name="colecao" component={Colecao} options={{ headerShown: false }} />
        <Screen name="outro-perfil" component={PerfilOutroUsuario} options={{ headerShown: false }} />
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
