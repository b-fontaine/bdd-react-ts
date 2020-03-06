// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { setJestCucumberConfiguration } from "jest-cucumber";

Enzyme.configure({ adapter: new Adapter() });

setJestCucumberConfiguration({
  /*
   * Default Jest Cucumber Configuration :
   *  - tagFilter: will cause jest-cucumber to skip any scenario that is filtered out via a tag filter
   *    (example: '@ui and not @slow')
   *  - scenarioNameTemplate: function to be provided to generate the scenario title as desired.
   *    example: scenarioNameTemplate: (vars) => {
   *        return ` ${vars.featureTitle} - ${vars.scenarioTitle}}`;
   *    }
   *    The following info is available in the vars argument:
   *     - featureTitle - string
   *     - featureTags - string[]
   *     - scenarioTitle - string
   *     - scenarioTags - string[]
   *  - loadRelativePath: Use, or not, relative paths (default: false)
   */
  loadRelativePath: true
});
