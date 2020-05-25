﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace FlightControlWeb.Models
{
    public class Server
    {
        [Key]
        [Required]
        public string ServerId { get; set; }
        public string ServerURL { get; set; }
    }
}
