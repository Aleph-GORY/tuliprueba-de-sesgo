using Tulipanas.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Tulipanas.Utility
{
    public static class AccessRepository
    {
        internal static IDbConnection Connection
        {
            get
            {
                return new SqlConnection(Startup.StaticConfiguration.GetValue<string>("DB"));
            }
        }

        public static Usuario Login(string prefijo, string nombreUsuario, string passHash)
        {
            using IDbConnection conection = Connection;
            conection.Open();
            Usuario usuario = conection.Query<Usuario>("b4b_login", new
            {
                prefijo,
                nombreUsuario,
                passHash,
            }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            conection.Close();
            return usuario;
        }
    }
}
