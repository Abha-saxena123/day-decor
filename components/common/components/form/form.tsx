
import { FormWrapper, FormSubmitButton, FormContainer } from "./form.styles";
import { ReactNode, useEffect } from "react";

interface FormProps {
  onSubmit: any;
  submitBtnTxt?: string;
  isLogin?: boolean;
  children?: ReactNode;
  style?: any;
  initialValues?: any
}


export const Form: React.FC<FormProps> = ({
  onSubmit,
  submitBtnTxt,
  children,
  isLogin,
  initialValues,
  ...props
}) => {

  const [form] = FormWrapper.useForm();

  // Set initial values if provided
  useEffect(() => {
    if (initialValues) {
      console.log("initialValues", initialValues)
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <FormContainer isLogin={isLogin} >
      <FormWrapper onFinish={onSubmit} {...props}>
        {children}
        {submitBtnTxt && (
          <FormSubmitButton type="submit">
            {submitBtnTxt ? submitBtnTxt : "Submit"}
          </FormSubmitButton>
        )}
      </FormWrapper>
    </FormContainer>
  );
};

