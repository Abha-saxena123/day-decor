import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, message, Radio, Typography, Select, Form as AntForm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFetch } from '../hooks/use-fetch';
import axios from 'axios';
import { BASE_URL } from '../common/utils/constants/api.constant';
import { Form } from "../common/components/form/form";
import { FormInput, StyledInput, StyledFormWrapper, StyledButton } from "../common/components/form/form.styles";
import { useMutation } from '../hooks/use-mutation';

const { Option } = Select;
const { Title, Text } = Typography;

interface AddressBookModel {
    address: string;
    name: string;
    phoneNumber: string;
    tag: string;
    id: number
}

const formateData = (data: any) => {
    let formattedData = data.map((d: any) => {
        return {
            ...d?.attributes, id: d.id, address: d?.attributes?.addressLine + ", " + d?.attributes?.city + ", " + d?.attributes?.state + ", " + d?.attributes?.country + ", " + d?.attributes?.pincode
        }
    })
    return formattedData;
}
export const AddressBook = ({ userId }: { userId: string }) => {

    const { data: addresses, isLoading, mutate } = useFetch<AddressBookModel[]>({ id: "address-books", params: { "populate": "*", "filters[user][id][$in]": userId }, cb: formateData })
    const [radioValue, setRadioValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isCustomOccasion, setIsCustomOccasion] = useState(false);
    const [customOccasionValue, setCustomOccasionValue] = useState("other");
    const { mutations: { post, del }, isMutating } = useMutation({ id: 'address-books' });
    const [value, setValue] = useState(null);
    const [formValue, setFormValue] = useState<AddressBookModel | null>(null);
    if (isLoading) { return null }
    const handleCustomOccasion = (e: any) => {
        setCustomOccasionValue(e.target.value)
    }
    const handleDelete = async (index: number) => {
        const resp = await del({}, (addresses as AddressBookModel[])[index].id as number);
        if (resp.status === 200) {
            mutate();
            message.success('Address deleted successfully!');

        } else {
            message.error("Something went wrong, please try again");
        }

    };

    const handleEdit = async (index: number) => {
        setFormValue((addresses as AddressBookModel[])[index]);
        setIsEditing(true);
        // const resp = await post({}, (addresses as AddressBookModel[])[index].id as number);
        // if (resp.status === 200) {
        //     mutate();
        //     message.success('Address deleted successfully!');

        // } else {
        //     message.error("Something went wrong, please try again");
        // }

    };

    const handleFormSubmit = async (data: any) => {
        const payload = {
            data: {
                user: userId,
                name: data.title + data.name,
                ...data
            }
        };
        const resp = await post(payload);
        if (resp.status === 200) {
            mutate();
            message.success('Address saved submitted successfully!');
            setIsEditing(false)
            setIsCustomOccasion(false)
        } else {
            message.error("Something went wrong, please try again");
        }
    }

    return (
        <Container>
            <Header>
                <StyledTitle>Address Book</StyledTitle>
                <AddAddressButton type="link" onClick={() => { setIsEditing(!isEditing); setFormValue(null); }}>{isEditing ? "Cancel" : "Add New Address"}</AddAddressButton>
            </Header>
            {isEditing &&
                <Form onSubmit={handleFormSubmit} style={{
                    backgroundColor: "#fff0f2",
                    minWidth: "400px",
                    width: "100 %",
                    minHeight: "max-content"
                }}
                    initialValues={formValue}>
                    <StyledTitle style={{ alignSelf: "center" }}>Add New Address</StyledTitle>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <AddressDetails
                            name="title"
                            rules={[{ required: false, message: 'Please select an option!' }]}
                        >
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Title :</Typography.Title>
                                <StyledSelect
                                    placeholder="Please select an option"
                                    value={value}
                                    onChange={(e: any) => setValue(e)}
                                >
                                    <Option value="Mr.">Mr.</Option>
                                    <Option value="Mrs.">Mrs.</Option>
                                    <Option value="Miss.">Miss.</Option>
                                </StyledSelect>
                            </div>
                        </AddressDetails>
                        <AddressDetails name="name" rules={[{ required: true, message: 'Please enter name...' }]}>
                            <div defaultValue={formValue?.name}>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Full Name :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: Rucha singh" />
                            </div>
                        </AddressDetails>
                        <AddressDetails name="phoneNumber" rules={[{ required: true, message: 'Please enter Mobile...' }]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Mobile :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: 1234567890" />
                            </div>
                        </AddressDetails>
                        <AddressDetails name="alternatePhoneNumber" rules={[]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Alternate Mobile :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: 1234567890" />
                            </div>
                        </AddressDetails>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <AddressDetails name="recipientEmail" rules={[]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Email :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: Recipient Email" />
                            </div>
                        </AddressDetails>

                        <AddressDetails name="addressLine" rules={[{ required: true, message: 'Please enter Address Line...' }]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Address Line :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: PL 67, Ronak road" />
                            </div>
                        </AddressDetails>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <AddressDetails name="country" rules={[{ required: true, message: 'Please enter India...' }]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Country :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: India" />
                            </div>
                        </AddressDetails>
                        <AddressDetails name="pincode" rules={[{ required: true, message: 'Please enter Pincode...' }]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>Pincode :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: 123456" />
                            </div>
                        </AddressDetails>

                        <AddressDetails name="city" rules={[{ required: true, message: 'Please enter City...' }]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>City :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: Jaipur" />
                            </div>
                        </AddressDetails>
                        <AddressDetails name="state" rules={[{ required: true, message: 'Please enter State...' }]}>
                            <div>
                                <Typography.Title level={4} style={{ alignSelf: "flex-start" }}>State :</Typography.Title>
                                <StyledInput type={"text"} placeholder="Eg: Rajastahan" />
                            </div>
                        </AddressDetails>
                    </div>
                    <AddressDetails name="tag" value={formValue?.tag || radioValue}>
                        <Radio.Group name="tag" onChange={(e) => setRadioValue(e.target.value)} defaultValue="Home" size="large" style={{ gap: "16px", display: "flex", width: "100%", }}>
                            <Radio value="Home" onChange={() => setIsCustomOccasion(false)} style={{ width: "50%", borderRadius: "6px", }}>Home</Radio>
                            <Radio value="Work" onChange={() => setIsCustomOccasion(false)} style={{ width: "50%", borderRadius: "6px", }}>Work</Radio>
                            <Radio value={customOccasionValue} onChange={() => setIsCustomOccasion(true)} style={{ width: "100%", borderRadius: "6px", }}>Others</Radio>

                        </Radio.Group>
                    </AddressDetails>
                    {isCustomOccasion && <AddressDetails name="tag">
                        <StyledInput type={"text"} placeholder="Enter Tag" value={customOccasionValue} onChange={handleCustomOccasion} />
                    </AddressDetails>}
                    <StyledFormWrapper >
                        <StyledButton type="primary" htmlType="submit">SAVE & ADD</StyledButton>
                    </StyledFormWrapper>
                </Form>}
            {addresses && addresses.length === 0 ? <div>No Address available</div> : addresses?.map((address, index) => (
                <StyledCard key={index}>
                    <CardHeader>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <Name>{address.name}</Name>
                            <Tag>{address.tag}</Tag>
                        </div>
                        <CardFooter>
                            <EditButton type="link" icon={<EditOutlined />} disabled={true} onClick={() => handleEdit(index)}>Edit</EditButton>
                            <DeleteButton type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(index)}>Delete</DeleteButton>
                        </CardFooter>
                    </CardHeader>
                    <CardBody>
                        <Text>{address.address}</Text>
                        <Text>{address.phoneNumber}</Text>
                    </CardBody>

                </StyledCard>
            ))
            }
        </Container >
    );
};

const Container = styled.div`
  padding: 20px;
width:100%;
gap:16px;
display:flex;
flex-direction:column;
form,div{
width:100%;
}
.ant-row {
width:100%;
}
.ant-form-item-control-input-content{
display:flex;}
.ant-card-body {
    padding:16px !important;
}

`;

const AddressDetails = styled(FormInput)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width:100%;
flex:1;
h4{
margin:2px;
margin-top:2px !important;
}
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledTitle = styled(Title)`
  && {
    margin: 0;
margin-bottom:8px;
    color: #F2266B;
  }
`;

const AddAddressButton = styled(Button)`
  && {
    color: #F2266B;
    font-size: 16px;
  }
`;

const StyledCard = styled(Card)`
  && {
    border: 1px solid #F2266B;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #fff0f2;

  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled(Text)`
  && {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Tag = styled.span`
  background-color: #F2266B;
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
`;

const CardBody = styled.div`
  margin: 10px 0;
display:flex;
flex-direction:column;
gap:8px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditButton = styled(Button)`
  && {
    color: black;
  }
padding:4px 8px;
`;

const DeleteButton = styled(Button)`
 padding:4px 8px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

export default AddressBook;
