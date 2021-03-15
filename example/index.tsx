import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InstanceProvider, useInstance } from '../.';

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

ReactDOM.render(
  <InstanceProvider>
    <App />
  </InstanceProvider>,
  document.getElementById('root')
);
