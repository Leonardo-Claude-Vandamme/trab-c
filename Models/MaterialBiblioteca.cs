using System.Text.Json.Serialization;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "tipo")]
[JsonDerivedType(typeof(Livro), "livro")]
[JsonDerivedType(typeof(Revista), "revista")]
public abstract class MaterialBiblioteca
{
    public int Id {get; set;}

    public string? Titulo {get; set;}

    public abstract double CalcularPrazo();

    public virtual string Descricao()
    {
        return $"Título: {Titulo}";
    }
}