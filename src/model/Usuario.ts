enum Curso {
    DESENVOLVIMENTO = "DESENVOLVIMENTO",
    REDES = "REDES",
    MECANICA = "MECANICA",
    QUALIDADE = "QUALIDADE",
    FIC = "FIC"
  }
  
  enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
  }
  
  class Usuario {
    private _senha: string;
  
    constructor(
      public id: number,
      public nomeCompleto: string,
      public tag: string,
      public email: string,
      senha: string,
      public colecaoSalvos: Colecao[],
      public curso: Curso,
      public followers: number[],
      public descricao: string,
      public fotoPerfil: string,
      public fotoCapa: string,
      public roles: Role[],
      public moderador: boolean,
      public likedPosts: number[]
    ) {
      this._senha = senha;
    }
    get senha(): string {
        return this._senha;
    }
    set senha(senha: string){
        this._senha = senha
    }
}