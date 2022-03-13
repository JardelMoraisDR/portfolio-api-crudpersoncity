using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrudPersonCity.Domain.Entities
{
    [Table("Person")]
    public class Person
    {

        [Key]
        [Column("Id", TypeName = "INT")]
        public int Id { get; set; }

        [Column("Name", TypeName = "VARCHAR")]
        [StringLength(300)]
        [MaxLength(300)]
        [Required]
        public string Name { get; set; }

        [Column("CPF", TypeName = "VARCHAR")]
        [StringLength(11)]
        [MaxLength(11)]
        [Required]
        public string CPF { get; set; }

        [ForeignKey("City")]
        [Column("Id_City", TypeName = "INT")]
        [Required]
        public int Id_City { get; set; }

        [Column("Age", TypeName = "INT")]
        [Required]
        public int Age { get; set; }

    }
}
