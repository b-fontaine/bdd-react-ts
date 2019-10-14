using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SouscriptionAxaBuisiness;

namespace SouscriptionAxa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdditionController : ControllerBase
    {
        private readonly Addition addition = new Addition();

        private readonly ILogger<AdditionController> _logger;

        public AdditionController(ILogger<AdditionController> logger)
        {
            _logger = logger;
        }

        [HttpPut]
        public void Put(params int[] values)
        {
            foreach (int value in values) {
                addition.Add(value);
                _logger.LogInformation("A new value added : " + value.ToString());
            }
        }

        [HttpGet]
        public int Get()
        {
            return addition.Sum();
        }
    }
}
