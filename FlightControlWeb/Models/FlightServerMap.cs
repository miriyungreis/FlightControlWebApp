using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightControlWeb.Models
{
    public class FlightServerMap
    {
        [Key]
        [Required]
        public string FlightId { get; set; }
        public string ServerId { get; set; }
    }
}
