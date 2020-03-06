import { defineFeature, loadFeature, DefineStepFunction } from "jest-cucumber";
import AppNumbers from "./app.pure";

const feature = loadFeature("./app.feature");

const addNumber = (given: DefineStepFunction, numbers: AppNumbers) => {
  given(/^J'entre (.*) dans le calculateur$/, (nombre: string) => {
    numbers.ajoute(parseInt(nombre));
  });
};

defineFeature(feature, test => {
  test("Ajouter deux nombres", ({ given, when, then }) => {
    const numbers = new AppNumbers();
    let somme: number = 0;
    addNumber(given, numbers);
    addNumber(given, numbers);
    when("Je lance l'addition", () => {
      somme = numbers.somme();
    });
    then(/^J'obtiens (.*)$/, (resultat: string) => {
      expect(somme).toBe(parseInt(resultat));
    });
  });
});
