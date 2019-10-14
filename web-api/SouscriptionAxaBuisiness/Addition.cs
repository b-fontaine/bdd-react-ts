using System.Collections.Generic;
using System.Linq;

namespace SouscriptionAxaBuisiness
{
    public class Addition
    {
        private List<int> numbers = new List<int>();

        /// <summary>
        /// Adds a new value to the addition list
        /// </summary>
        /// <param name="value">Value to add</param>
        public void Add(int value)
        {
            numbers.Add(value);
        }

        /// <summary>
        /// Add all the numbers in the list
        /// </summary>
        /// <returns>An int with the sum of values</returns>
        public int Sum()
        {
            return numbers.Sum();
        }
    }
}
