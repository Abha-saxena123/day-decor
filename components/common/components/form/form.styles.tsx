import { Button, Form, Input } from "antd";
import styled from "styled-components";

export const FormWrapper = styled(Form)`
background-color: white;
width: max-content;
padding:20px;
max-width:1000px;
min-height:600px;
height: max-content;
margin-right: 32px;
box-shadow: 6px 6px 6px 6px grey;
border-radius:12px;
min-width:505px;
display:flex;
flex-direction:column;
justify-content:center;
`

export const StyledInput = styled(Input)`
text-align: center;
`;

export const FormSubmitButton = styled.button`
align: center;
`;

export const FormContainer = styled.div<{ isLogin?: boolean }>`
shift-up: 60px;
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 32px 32px 32px;
  > div {
    > h2 {
      font-size: 80px;
      margin: 0;
    }
  }
p{
color: #A0A0A0;
}
`;

export const IconWrapper = styled.div`
display:flex;
gap:16px;
width:max-content;
`


export const StyledButton = styled(Button)`
flex:1;
`;

export const StyledTitle = styled.h1`
color:#F2266B;
font-size: 56px;
margin: 8px;
text-align:center;
width:100%
`
export const StyledH2 = styled.h2`
text-align: center;
font-size: 28px;
margin-top:0`

export const StyledDivWrapper = styled(Form.Item)`
  display: flex;
  align-items: center;
  justify-content:center;
  height: 100%;
  width:100%;
  flex:1;
  > div{
   flex:1;
  }
`;

export const FormInput = ({ children, label, name, rules, ...rest }: any) => {
  return <StyledDivWrapper label={label}
    name={name}
    rules={rules}
    {...rest}>
    {children}
  </StyledDivWrapper>
}


export const StyledFormWrapper = styled(FormInput)`
display:flex;
width:100%;
flex:1;
.ant-form-item-control-input-content{
width:100%;
flex-grow:1;
>div{
width:100%;
flex-grow:1;
}
  display:flex;
  > button,input {
      flex:1 ;
      }
  }
`;