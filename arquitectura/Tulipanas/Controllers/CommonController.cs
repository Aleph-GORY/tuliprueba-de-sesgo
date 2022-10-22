using Microsoft.AspNetCore.Mvc;

namespace Tulipanas.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
       /* [HttpPost, Route("api/[controller]/Login")]
        public IActionResult Login(Usuario usuarioIn)
        {
            UsuarioLogin usuario = AccessRepository.Login(usuarioIn.Prefijo, usuarioIn.NombreUsuario, Tools.Encrypt(usuarioIn.Password));
            HttpContext.Session.SetInt32("IdUsuario", (int)usuario.IdUsuario);
            HttpContext.Session.SetInt32("IdEmpresa", (int)usuario.IdEmpresa);
            HttpContext.Session.SetString("MapAcciones", usuario.MapAcciones);
            usuario.Modulos = AccessRepository.ObtenerMenuUsuario(usuario.IdUsuario);
          
        }*/


        [HttpPost, Route("api/[controller]/KeepSessionAlive")]
        public void KeepSessionAlive()
        {
        }
    }
}
