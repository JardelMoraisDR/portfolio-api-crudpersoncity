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
    public class CitiesController : ControllerBase
    {

        private readonly Context _context;

        public CitiesController(Context context)
        {
            _context = context;
        }

        // GET: api/City
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> Get()
        {
            var cities = await _context.Cities.ToListAsync();
            var defaultCity = await _context.Cities.FindAsync(0);

            if (cities == null || cities.Count() == 0 || defaultCity == null)
            {
                _context.Database.ExecuteSqlRaw(City.QueryToDefaultRegister());
                return await _context.Cities.ToListAsync();
            }

            return cities;

        }

        // GET: api/City/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> Get(int id)
        {

            var city = await _context.Cities.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            return city;

        }

        // PUT: api/City/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] City city)
        {

            if (id != city.Id)
            {
                return BadRequest();
            }

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cities.Any(e => e.Id == id))
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

        // POST: api/City
        [HttpPost]
        public async Task<ActionResult<City>> Post([FromForm] City city)
        {
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = city.Id }, city);
        }

        // DELETE: api/City/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            if (id == 0)
            {
                return Unauthorized();
            }

            var city = await _context.Cities.FindAsync(id);
            if (city == null)
            {
                return NotFound();
            }

            List<Person> inPerson = await _context.People.Where(x => x.Id_City == id).ToListAsync();

            if (inPerson != null && inPerson.Count() > 0)
            {
                return Unauthorized();
            }

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return NoContent();

        }

    }
}
