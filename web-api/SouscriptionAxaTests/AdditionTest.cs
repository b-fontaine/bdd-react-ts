using Xunit;
using SouscriptionAxaBuisiness;

namespace SouscriptionAxaTests
{
    public class AdditionTest
    {
        [Fact]
        public void MustReturnTheSumOfTwoNumbers()
        {
            Addition addition = new Addition();
            addition.Add(50);
            addition.Add(70);
            Assert.Equal(120, addition.Sum());
        }
    }
}
