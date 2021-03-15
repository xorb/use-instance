# use-instance

Library to get Object Instances via context. It can be useful when you want to access your object instances from other React components.

## Installation

In order to install the package. use the following command:

```sh
yarn add @backium/use-instance
```

## Usage

First, you should add `InstanceProvider`.

```ts
import { InstanceProvider } from '@backium/use-instance';
import App from './App';

export default () => {
  return (
    <InstanceProvider>
      <App />
    </InstanceProvider>
  );
};
```

Add object instance to the store

```ts
import { InstanceProvider, useInstance } from '@backium/use-instance';
import SomeComponent from './SomeComponent';

class SecretManager {
  get() {
    return 'supersecret';
  }
}

const App = () => {
  const { setInstance } = useInstance();
  const secretManager = new SecretManager();
  React.useEffect(() => {
    setInstance('secretManager', secretManager);
  }, []);
  return <SomeComponent />;
};
```

Use object instance from another component

```ts
import { useInstance } from '@backium/use-instance';

const SomeComponent = () => {
  const [secret, setSecret] = React.useState('');
  const { instances, getInstance } = useInstance();
  React.useEffect(() => {
    const instance = getInstance<SecretManager>('secretManager');
    const secretText = instance?.get();
    if (secretText) {
      setSecret(secretText);
    }
  }, [instances]);
  return <div>{secret}</div>;
};

export default SomeComponent;
```
