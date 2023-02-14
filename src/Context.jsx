import { createContext } from 'react';

const FormContext = createContext();
const FormProvider = FormContext.Provider;
const FormConsumer = FormContext.Consumer;

export { FormContext, FormProvider, FormConsumer };
