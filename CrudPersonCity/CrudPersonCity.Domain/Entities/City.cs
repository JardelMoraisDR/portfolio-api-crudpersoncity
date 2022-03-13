using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrudPersonCity.Domain.Entities
{
    [Table("City")]
    public class City
    {

        [Key]
        [Column("Id", TypeName = "INT")]
        public int Id { get; set; }

        [Column("Name", TypeName = "VARCHAR")]
        [StringLength(200)]
        [MaxLength(200)]
        [Required]
        public string Name { get; set; }

        [Column("UF", TypeName = "VARCHAR")]
        [StringLength(2)]
        [MaxLength(2)]
        [Required]
        public string UF { get; set; }

        public static string QueryToDefaultRegister()
        {
            return "SET IDENTITY_INSERT dbo.City ON " +
                   "INSERT INTO [dbo].[City] ([Id],[Name],[UF]) VALUES (0, 'Não definida', 'ND') " +
                   "SET IDENTITY_INSERT dbo.City OFF";
        }

    }

}

