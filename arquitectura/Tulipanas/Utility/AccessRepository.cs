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

        public static void CreateWork(string audioPath, string csvPath)
        {
            using IDbConnection conection = Connection;
            conection.Open();
            conection.Execute("create_work", new
            {
                audioPath,
                csvPath
            }, commandType: CommandType.StoredProcedure);
            conection.Close();
        }

        public static Work Login(string prefijo, string nombreUsuario, string passHash)
        {
            using IDbConnection conection = Connection;
            conection.Open();
            Work usuario = conection.Query<Work>("b4b_login", new
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
