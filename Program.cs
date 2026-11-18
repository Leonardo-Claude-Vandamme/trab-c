var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = "front"
});

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<IMaterialRepository, MaterialRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
