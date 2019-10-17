# Web API

Exemple fonctionnel : https://localhost:2819/weatherforecast

## Fonctionnement

Nous avons ici 4 projets :

- `SouscriptionAxa` : Projet d'interface, il sert aux échanges http
- `SouscriptionAxaBusiness` : Projet en tant que tel, il ne contient que le code métier (pures, Net Standard Library)
- `SouscriptionAxaTests` : Partie réservée au TDD, contiendra les tests unitaires
- `SouscriptionAxaFeatures` : Partie fonctionnelle, contiendra les scenarios ainsi que leur automatisation

Rien ne sert de dupliquer les tests. Ainsi, les tests issus des features ne seront pas réécrits dans les TU.
Les TU ne servirons que pour certains tests dis techniques.

Enfin, nous aurions pu garder au sein du même projet l'API et le Business si Specflow permettait de tester du code dotnet core (pas encore le cas au moment où j'écris ces lignes).
Là, pour des contraintes techniques (specflow, dotnet core, compatibilité des sources avec MacOS), je passe par une librairie en net standard 2. Ce n'est pas une mauvaise pratique en soi mais ce n'était pas indispensable non plus.

Pour se rassurer, nous pouvons penser que le code métier pure est à part, testé et interfaçable à souhait.

## Outillage

### IDE: Visual Studio 2019

Visual Studio est disponible sur PC Windows et Mac. Il est nativement prévu pour créer des applications dotnet core (api, web, etc.).

Bien qu'il soit aussi possible via d'autres IDE comme VS Code, il sera plus simple d'utiliser Visual Studio 2019 pour travailler sur cette API, ne serait-ce que pour la génération du code behind pour la partie Spectflow.

### [Specflow](http://specflow.org)

Specflow est un outil de définition et d'excution de tests de comportements (BDD). Avec celui-ci, vous pouvez écrire vos features en Gherkin et les automatiser.

La version offcielle est pour Windows mais il existe une version de [Straight'8s pour MacOS](https://github.com/straighteight/SpecFlow-VS-Mac-Integration) :

## Exemple

Pour exemple, j'ai créé un controller qui effectue une addition. En fait il s'agit de la feature par défaut avec les nouveaux projets Specflow. J'ai donc juste décidé de l'implémenter.

```feature
Scenario: Add two numbers
    Given I have entered 50 into the calculator
    And I have entered 70 into the calculator
    When I press add
    Then the result should be 120 on the screen
```

J'ai laissé ce test en anglais mais rien ne vous empêche de l'écrire en anglais. Les mots clef `Scenario`, `Given`, `Then`, `When` et `And` doivent, néanmoins rester en anglais. Il est techniquement possible de les passer en français mais nous aurions une incohérence avec la partie TypeScript qui, elle, ne peut pas changer la langue de ses mots clef.

Ce qui donne pour le code des Steps :

```cs
//Local values
private Addition addition = new Addition();
private int sum;

[Given("I have entered (.*) into the calculator")]
public void GivenIHaveEnteredSomethingIntoTheCalculator(int number)
{
    addition.Add(number);
}

[When("I press add")]
public void WhenIPressAdd()
{
    sum = addition.Sum();
}

[Then("the result should be (.*) on the screen")]
public void ThenTheResultShouldBe(int result)
{
    Assert.AreEqual(result, sum);
}
```

Et, donc, le code buisiness

```cs
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
```

J'ai ajouté un TU pour la forme qui fait l'équivalent du scenario :

```cs
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
```

Tout ceci donne un exemple avec tous les fichiers :

- Test de scenario
- Test unitaire
- Code métier
- Interface (API ici)
