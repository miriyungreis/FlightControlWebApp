using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class Server
    {
        public int Id { get; set; }
        public string ServerId { get; set; }
        public string ServerURL { get; set; }
    }
     public class ServerDto
    {
        public string ServerId { get; set; }
        public string ServerURL { get; set; }
    }
}
