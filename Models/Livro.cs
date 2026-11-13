public class Livro : MaterialBiblioteca, IEmprestimo
{
    public string? Autor{get; set;}

    public int Paginas{get; set;}

    public override double CalcularPrazo()
    {
        return 14;
    }

    public override string Descricao()
    {
        return $"Livro de {Autor} tem {Paginas} Páginas";
    }

    public double Emprestar(Boolean emprestado)
    {
        return emprestado ? CalcularPrazo() : 0;
    }

}