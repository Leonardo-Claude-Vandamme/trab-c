public class Revista : MaterialBiblioteca
{
     public string? Edicao{get; set;}

    public int MesPublicacao{get; set;}

     public override double CalcularPrazo()
    {
        return 7;
    }

    public override string Descricao()
    {
        return $"Revista de {Edicao} do mês de publicação {MesPublicacao}";
    }

}