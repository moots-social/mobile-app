const erroLog = (erro: any, localErro: string, arquivo: string, status?: number): void => {
    console.error(`AÇÃO FINALIZADA\n
                ERRO ENCONTRADO EM ${localErro}, ARQUIVO: ${arquivo}\n
                ERRO: ${erro}\n
                TEM STATUS: ${status ? status : false}`)
}

export default{
    erro: erroLog
}