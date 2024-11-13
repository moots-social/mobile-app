import { useUsuarioContext } from '../../context/UsuarioContext'
import { useEffect, useState } from 'react'
import { PerfilBox} from '../../components/perfil/PerfilComponents'

import LinearGradientMoots from '../../components/geral/LinearGradientMoots'
import Loading from '../../components/geral/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { autenticar, desautenticar } from '../../redux/useAutenticacao'

export default function PerfilUsuario() {

  const usuario = useSelector(state => state.usuario.user)
  const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>{
        setIsLoading(false)
        }, 150)
    }, [])
  return (
    <LinearGradientMoots>
      <Loading isOpen={isLoading} />
      <PerfilBox objetoARenderizar={usuario} seguir={false}/>
    </LinearGradientMoots>
  )
}