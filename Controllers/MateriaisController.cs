using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MateriaisController : ControllerBase
{
    private readonly IMaterialRepository _materialRepository;

    public MateriaisController(IMaterialRepository materialRepository)
    {
        _materialRepository = materialRepository;
    }

    [HttpGet]
    public ActionResult<IEnumerable<MaterialBiblioteca>> ObterTodos()
    {
        return Ok(_materialRepository.ObterTodos());
    }

    [HttpGet("{id:int}")]
    public ActionResult<MaterialBiblioteca> ObterPorId(int id)
    {
        var material = _materialRepository.ObterPorId(id);
        return material is null ? NotFound() : Ok(material);
    }

    [HttpPost]
    public ActionResult<MaterialBiblioteca> Adicionar(MaterialBiblioteca material)
    {
        var materialAdicionado = _materialRepository.Adicionar(material);
        return CreatedAtAction(
            nameof(ObterPorId),
            new { id = materialAdicionado.Id },
            materialAdicionado);
    }

    [HttpPut("{id:int}")]
    public IActionResult Atualizar(int id, MaterialBiblioteca material)
    {
        return _materialRepository.Atualizar(id, material) ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public IActionResult Remover(int id)
    {
        return _materialRepository.Remover(id) ? NoContent() : NotFound();
    }
}