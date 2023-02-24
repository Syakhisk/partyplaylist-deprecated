import React from "react";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { Schema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  defaultValues?: Pick<UseFormProps, "defaultValues">;
  children: React.ReactNode;
  onSubmit: (data: FieldValues) => any;
  yupSchema: Schema;
};

const Form = ({ defaultValues, children, onSubmit, yupSchema }: Props) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(yupSchema),
  });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                formState: methods.formState,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

export default Form;
