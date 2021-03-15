import * as React from 'react';

interface InstanceItem {
  id: string;
  value: any;
}

interface InstancesContext {
  register: (id: string, value: any) => void;
  instances: InstanceItem[];
}

const Context = React.createContext<InstancesContext>({
  register: () => {},
  instances: [],
});

export const InstanceProvider: React.FC = ({ children }) => {
  const [instances, setInstances] = React.useState<InstanceItem[]>([]);

  const register = React.useCallback(
    (id, value) => {
      const cleanInstances = instances.filter(instance => instance.id !== id);
      const newInstances = cleanInstances.concat([{ id, value }]);
      setInstances(newInstances);
    },
    [instances]
  );
  const context = React.useMemo(
    () => ({
      register,
      instances,
    }),
    [register, instances]
  );
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useInstance() {
  const { register, instances } = React.useContext(Context);
  const getInstance = React.useCallback(
    <T extends unknown>(key: string): T | undefined => {
      const instance = instances.find(instance => instance.id === key);
      if (instance) {
        return instance.value;
      }
      return;
    },
    [instances]
  );

  const setInstance = React.useCallback(
    (id: string, value: any) => {
      register(id, value);
    },
    [register]
  );

  return { getInstance, setInstance, instances };
}
