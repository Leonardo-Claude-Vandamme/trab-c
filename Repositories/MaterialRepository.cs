using System.Linq;
public class MaterialRepository : IMaterialRepository
{
   private static Dictionary<int, MaterialBiblioteca> _materiais = new Dictionary<int, MaterialBiblioteca>()
    {
        {1, new Livro {Id=1, Autor="Lobato", Paginas=67, Titulo="O lobo"}},
        {2, new Revista {Id=2, Edicao="limitada", MesPublicacao= 3, Titulo ="Livros unicos"}}
       
    }; 
    private int GerarNovoId()
{
    if (_materiais.Count == 0)
        return 1;

    return _materiais.Keys.Max() + 1;
}
 
   public IEnumerable<MaterialBiblioteca> ObterTodos()
    {
        return _materiais.Values;
    }

    public MaterialBiblioteca? ObterPorId(int id)
    {
        if (!_materiais.ContainsKey(id))
        {
            return null;
        }
        return _materiais[id];
    }

    public MaterialBiblioteca Adicionar(MaterialBiblioteca material)
    {
        material.Id = GerarNovoId();
        _materiais.Add(material.Id, material);
        return material;
    }

    public bool Atualizar(int id, MaterialBiblioteca material)
    {
        if (!_materiais.ContainsKey(id))
        {
            return false;
        }

        material.Id = id;
        _materiais[id] = material;
        return true;
    }

    public bool Remover(int id)
    {
        return _materiais.Remove(id);
    }
}
