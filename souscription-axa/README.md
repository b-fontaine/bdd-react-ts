# Le BDD avec React

En respectant tout ce qui est écrit sur le [README](../README.md), créons notre application en React avec Typescript.

## Création du projet

Pour créer un projet facilement et rapidement, commençons par utiliser le CRA ([Create React App](https://github.com/facebook/create-react-app))

```shell
# npx create-react-app souscription-axa --typescript
# cd souscription-axa
```

Une fois le projet créé, nous pouvons déjà l'exécuter et lancer les tests :

```shell
# yarn start
# yarn test
```

Sur VSCode, par exemple, la fonctionnalité `Split terminal` permet d'afficher les deux résultats

Avant de commencer les développements, à proprement parler, commençons par réorganiser un peu le code et préparons le terrain.

Déplaçons les fichiers `App.*` dans un répertoire `app` puis créons un fichier `index.ts` dans ce nouveau répertoire :

```typescript
export { default } from './App';
```

De cette manière, dans le fichier de démarrage n'aura pas à faire

```typescript
import App from './app/App';
```

mais

```typescript
import App from './app';
```

J'admets que ce n'est qu'estétique, mais, lorsque vous aurez des dizaines de répertoires qui contiendrons des sous répertoires, la lecture du code en sera simplfiée.

Voyez donc ça comme un exemple et une réflexe à avoir.

Ne nous arrêtons pas là et retirons `App.css`, `logo.svg` ainsi que le contenu de App.tsx pour obtenir :

```typescript
import React from 'react';

const App: React.FC = () => <div />;

export default App;
```

L'avantage de cette action est double : on retire le design inutile et on retire du code non testé.

## Ajout des dépendances nécessaires

### Pour le style

Pour le style, nous utiliserons SASS. C'est une extension de CSS qui en fait un vrai langage de programmation en permettangt les boucles, les conditions, etc.

Pour l'installer sur notre projet, lançons un :

```shell
# yarn add node-sass
```

puis renommons notre `index.css` en `index.scss` (y compris dans index.tsx).

Etant donné que le SASS dérive du CSS, changer l'extension sans changer le code n'a aucun impact.

### Outils de test

#### Première chose : installer Enzyme

```shell
yarn add enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 jest-enzyme -D
```

Enzyme est un ensemble d'outils, développés par [AirBNB](https://github.com/airbnb/enzyme), qui facilite le test de composants React.

Pour qu'il soit configuré automatiquement pour tous les tests, créons notre fichier `/src/setupTests.ts` avec le contenu :

```typescript
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

Il sera automatiquement exécuté avant chaque test.

#### Seconde chose : installer Gherkin et Jest Cucumber.

Pour installer Gherkin, il faut se baser sur les extensions de votre IDE. Pour VSCode, par exemple, vous pouvez utiliser [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)

```shell
# code --install-extension alexkrechik.cucumberautocomplete
```

Pour Atom, vous pouvez tester l'extention [laguage-gherkin](https://atom.io/packages/language-gherkin).

Une fois que votre IDE comprend et colore syntaxiquement vos instructions Gherkin, vous pouvez ajouter [jest-cucumber](https://github.com/bencompton/jest-cucumber) à votre projet :

```shell
# yarn add jest-cucumber -D
```

### Routing

Pour bien séparer nos fonctionnalités, nous pouvons utiliser les routes HTML.

Commençons par installer nos dépendances :

```shell
# yarn add react-router react-router-dom
```

```shell
# yarn add @types/react-router @types/react-router-dom -D
```

Continuons en créant le fichier `router.tsx`, fichier qui permettra de centraliser les routes principales.

```typescript
import App from './app';
import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';

export default () => (
  <Switch>
    <Route exact path="/" render={() => <App />} />
    <Redirect to="/" />
  </Switch>
);
```

Pour qu'il soit utilisé, nous devons le référencer comme composant dans `index.tsx`. Par contre, pour pouvoir gérer nos routes dans l'application, nous devrons utiliser le `BrowserRouter` de `react-router-dom`.

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
```

## Ajout du design

Pour cet exemple, nous utiliserons le toolkit AXA France, qui fera un bon exemple de toolkit d'entreprise.

### Installation

Commençons par installer le package

```shell
yarn add @axa-fr/react-toolkit-all
```

Puis ajoutons les éléments nécessaires à la création de nos futurs formulaires :

```scss
@import '@axa-fr/react-toolkit-form-core/dist/form.scss';
@import '@axa-fr/react-toolkit-title/dist/title.scss';
@import '@axa-fr/react-toolkit-button/dist/button.scss';
@import '@axa-fr/react-toolkit-table/dist/table.scss';
@import '@axa-fr/react-toolkit-table/dist/Paging/paging.scss';
@import '@axa-fr/react-toolkit-table/dist/Pager/pager.scss';
@import '@axa-fr/react-toolkit-form-input-select/dist/select.scss';
@import '@axa-fr/react-toolkit-form-input-date/dist/datepicker.scss';
@import '@axa-fr/react-toolkit-form-input-text/dist/inputtext.scss';
@import '@axa-fr/react-toolkit-panel/dist/panel.scss';
@import '@axa-fr/react-toolkit-loader/dist/spinner.scss';
@import '@axa-fr/react-toolkit-core/dist/assets/scss/core.scss';
@import '@axa-fr/react-toolkit-layout-header/dist/Title/title-bar.scss';
@import '@axa-fr/react-toolkit-form-input-file/dist/file.scss';
@import '@axa-fr/react-toolkit-form-input-file/dist/filebrowser.scss';

.af-title-bar {
  &--backhome {
    .af-title-bar {
      &__wrapper {
        justify-content: flex-start;
        .af-title-bar__title {
          margin-left: 1em;
        }
      }
    }
  }
  &--hasstepper {
    margin-bottom: 0;
  }
}

textarea {
  overflow: auto;
  resize: both;
  width: 100%;
  height: 30em;
}
```

Ces lignes sont à mettre dans index.scss.

Enfin, pour permettre l'ajout d'un logo au format SVG, nous devons l'autoriser dans typescript.
Pour celà, il nous faut un script dans `@types/svg.d.ts` avec le contenu :

```typescript
declare module '*.svg' {
  const content: any;
  export default content;
}
```

### Création de layout de base

Pour des objets graphiques de base comme le Header, mettons les dans un répertoire dédié appelé `layout` (pour être original)

```tsx
const HeaderApp = () => (
  <Header>
    <Name title="Souscription AXA" img={logo} alt="Logo React" />
  </Header>
);
```

Oui, je l'ai appelé HeaderApp pour ne pas faire doublon avec le Header du toolkit AXA. Néanmoins, nous le réutiliserons tel quel dans l'index.tsx :

```tsx
ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Router />
  </BrowserRouter>,
  document.getElementById('root')
);
```

N'oublions pas le style :

```scss
@import '@axa-fr/react-toolkit-layout-header/dist/Header/header.scss';
@import '@axa-fr/react-toolkit-layout-header/dist/Infos/infos.scss';
@import '@axa-fr/react-toolkit-layout-header/dist/Name/name.scss';
@import '@axa-fr/react-toolkit-layout-header/dist/User/user.scss';
@import '@axa-fr/react-toolkit-layout-header/dist/Logo/logo.scss';

.af-header__content {
  padding-bottom: 0em;
}
```

Et notre App.tsx contenant l'exemple de design :

```tsx
const App: React.FC = () => (
  <>
    <div className="af-title-bar">
      <div className="af-title-bar__wrapper container-fluid container">
        <h1 className="af-title-bar__title">
          Exemple
          <small className="af-title-bar__subtitle">Design</small>
        </h1>
      </div>
    </div>
    <div className="af-home container">
      <span>Ceci est une page d'exemple.</span>
    </div>
  </>
);
```

Nous voilà enfin prêts pour commencer le développement des fonctionnalités.
