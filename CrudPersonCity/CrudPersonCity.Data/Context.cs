using CrudPersonCity.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CrudPersonCity.Data
{
    public class Context : DbContext
    {

        public DbSet<City> Cities { get; set; }
        public DbSet<Person> People { get; set; }

        public Context(DbContextOptions<Context> contextOptions) : base(contextOptions)
        {
        }

    }
}
