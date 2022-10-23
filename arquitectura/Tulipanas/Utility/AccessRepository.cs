using Tulipanas.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Linq;
using MySqlConnector;
using System.Collections.Generic;

namespace Tulipanas.Utility
{
    public static class AccessRepository
    {
        internal static IDbConnection Connection
        {
            get
            {
                return new MySqlConnection(Startup.StaticConfiguration.GetValue<string>("DB"));
            }
        }

        public static void CreateWork(string fullPath, string audioPath, string csvPath)
        {
            using IDbConnection conection = Connection;
            conection.Open();
            conection.Execute("create_work", new
            {
                fullPath,
                audioPath,
                csvPath
            }, commandType: CommandType.StoredProcedure);
            conection.Close();
        }

        public static List<Work> GetSuccess()
        {
            using IDbConnection conection = Connection;
            conection.Open();
            List<Work> usuario = conection.Query<Work>("get_success", null, commandType: CommandType.StoredProcedure).ToList();
            conection.Close();
            return usuario;
        }
    }
}
