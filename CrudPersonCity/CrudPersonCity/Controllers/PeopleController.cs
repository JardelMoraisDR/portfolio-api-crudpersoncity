using CrudPersonCity.Domain.Entities;
using CrudPersonCity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace CrudPersonCity.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {

        private readonly Context _context;

        public PeopleController(Context context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> Get()
        {
            return await _context.People.ToListAsync();
        }

        // GET: api/People/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> Get(int id)
        {

            var person = await _context.People.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;

        }

        // PUT: api/People/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] Person person)
        {

            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.People.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();

        }

        // POST: api/People
        [HttpPost]
        public async Task<ActionResult<Person>> Post([FromForm] Person person)
        {
            _context.People.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = person.Id }, person);
        }

        // DELETE: api/People/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}
