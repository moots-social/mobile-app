import LinearGradientMoots from "../../components/geral/LinearGradientMoots";
import {PerfilBox} from "../../components/perfil/PerfilComponents";

const teste = {
    nomeCompleto: "Lucio Freitas",
    tag: "lucinElgr4nde",
    descricao: "est. 1996",
    curso:"DESENVOLVIMENTO"
}

export default function PerfilOutroUsuario(){
    return  <LinearGradientMoots>
                <PerfilBox objetoARenderizar={teste} seguir={true}/>
            </LinearGradientMoots>
    
}