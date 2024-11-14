const erroLog = (erro: any, localErro: string, arquivo: string, status?: number): void => {
    console.error(`ERRO\n
    ERRO ENCONTRADO EM ${localErro}, ARQUIVO: ${arquivo}\n
    ERRO: ${erro}\n
    TEM STATUS: ${status ? status : false}`)
}

const acaoFinalizadaLog = (acao: string, localAcao: string, arquivo: string, status?: number, retorno?: string): void => {
    console.error(`AÇÃO FINALIZADA\n
    AÇÃO FINALIZADA EM ${localAcao}, ARQUIVO: ${arquivo}\n
    AÇÃO: ${acao}\n
    TEM STATUS: ${status ? status : false}\n
    RETORNO: ${retorno || 'NENHUM'}`)
}

export default{
    erro: erroLog,
    acao: acaoFinalizadaLog,
}