
import { FormWrapper, FormSubmitButton, FormContainer } from "./form.styles";
import { ReactNode } from "react";

interface FormProps {
  onSubmit: any;
  submitBtnTxt?: string;
  isLogin?: boolean;
  children?: ReactNode;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  submitBtnTxt,
  children,
  isLogin,
}) => {
  return (
    <FormContainer isLogin={isLogin}>
      <FormWrapper onFinish={onSubmit}>
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

