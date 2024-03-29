import React from "react";
import {
  FormProvider,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { Schema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  defaultValues?: Pick<UseFormProps, "defaultValues">;
  children: React.ReactNode;
  onSubmit: (data: any, methods: UseFormReturn) => any;
  yupSchema: Schema;
};

const Form = ({ defaultValues, children, onSubmit, yupSchema }: Props) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => onSubmit(data, methods))}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
