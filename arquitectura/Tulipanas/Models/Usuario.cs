using System;

namespace Tulipanas.Models
{
    public class Usuario
    {
        private int? idUsuario;
        private int? idEmpresa;
        private int? idRol;
        private string prefijo;
        private string nombreUsuario;
        private string nombres;
        private string apellidoPaterno;
        private string apellidoMaterno;
        private string telefono;
        private string correo;
        private string avatar;
        private string password;
        private DateTime? fechaRegistro;
        private bool? activo;

        public Usuario()
        {
        }

        public Usuario(int? idUsuario, int? idEmpresa, int? idRol, string prefijo, string nombreUsuario, string nombres, string apellidoPaterno, string apellidoMaterno, string telefono, string correo, string avatar, string password, DateTime? fechaRegistro, bool? activo)
        {
            IdUsuario = idUsuario;
            IdEmpresa = idEmpresa;
            IdRol = idRol;
            Prefijo = prefijo;
            NombreUsuario = nombreUsuario;
            Nombres = nombres;
            ApellidoPaterno = apellidoPaterno;
            ApellidoMaterno = apellidoMaterno;
            Telefono = telefono;
            Correo = correo;
            Avatar = avatar;
            Password = password;
            FechaRegistro = fechaRegistro;
            Activo = activo;
        }

        public int? IdUsuario { get => idUsuario; set => idUsuario = value; }
        public int? IdEmpresa { get => idEmpresa; set => idEmpresa = value; }
        public int? IdRol { get => idRol; set => idRol = value; }
        public string Prefijo { get => prefijo; set => prefijo = value; }
        public string NombreUsuario { get => nombreUsuario; set => nombreUsuario = value; }
        public string Nombres { get => nombres; set => nombres = value; }
        public string ApellidoPaterno { get => apellidoPaterno; set => apellidoPaterno = value; }
        public string ApellidoMaterno { get => apellidoMaterno; set => apellidoMaterno = value; }
        public string Telefono { get => telefono; set => telefono = value; }
        public string Correo { get => correo; set => correo = value; }
        public string Avatar { get => avatar; set => avatar = value; }
        public string Password { get => password; set => password = value; }
        public DateTime? FechaRegistro { get => fechaRegistro; set => fechaRegistro = value; }
        public bool? Activo { get => activo; set => activo = value; }
    }
}
