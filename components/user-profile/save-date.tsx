import styled, { css } from "styled-components"
import { useFetch } from "../hooks/use-fetch";
import { Card, DatePicker, Radio, Typography, message, Menu, Dropdown, Button, } from "antd";
import { Form } from "../common/components/form/form";
import { FormInput, StyledInput, StyledFormWrapper, StyledButton } from "../common/components/form/form.styles";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../common/utils/constants/api.constant";
import { EllipsisOutlined } from '@ant-design/icons';

interface SavedDatesModel {
    Name: string;
    occasionDate: string;
    occasion: string;
    id: number
}


const formateData = (data: any) => {
    let formattedData = data.map((d: any) => {
        return { ...d?.attributes, id: d.id }
    })
    return formattedData;
}

export const SavedDates = ({ userId }: { userId: string }) => {
    const { data: savedDates, isLoading, mutate } = useFetch<SavedDatesModel[]>({ id: "saved-dates", params: { "populate": "*", "filters[users][id][$in]": userId }, cb: formateData })
    const [radioValue, setRadioValue] = useState("");
    const [isCustomOccasion, setIsCustomOccasion] = useState(false);
    const [customOccasionValue, setCustomOccasionValue] = useState("other");
    if (isLoading) return null;

    const handleFormSubmit = async (data: SavedDatesModel) => {
        const payload = { data: { users: userId, ...data } };
        const resp = await axios.post(`${BASE_URL}/api/saved-dates`, payload);
        if (resp.status === 200) {
            mutate();
            message.success('Date saved submitted successfully!');

            setIsCustomOccasion(false)
        } else {
            message.error("Something went wrong, please try again");
        }
    }
    const handleCustomOccasion = (e: any) => {
        setCustomOccasionValue(e.target.value)
    }
    return (
        <Wrapper>
            <StyledTitle>Saved Dates</StyledTitle>
            <ContentWrapper>
                <CardsWrapper>
                    {savedDates?.length && savedDates?.length > 0 ? savedDates?.map(({ Name, occasionDate, occasion, id }) => {
                        return <Card hoverable={true} title={occasionDate} bordered={true} key={id} extra={<ThreeDotMenu data={{ Name, occasionDate, occasion, userId, id }} mutate={mutate} />}>
                            <NameDiv >{Name}</NameDiv>
                            <Typography.Paragraph style={{ display: 'flex', gap: "8px", marginBottom: "4px" }}>Occasion: <Typography.Paragraph strong>{occasion}</Typography.Paragraph></Typography.Paragraph>
                        </Card>
                    }) : <Card hoverable={true} bordered={true}>
                        <Typography.Title level={3} >No Saved Dates, Fill the form to add</Typography.Title>
                    </Card>}
                </CardsWrapper>
                <Form onSubmit={handleFormSubmit} style={{
                    backgroundColor: "#fff0f2",
                    minWidth: "400px",
                    minHeight: "max-content"
                }}>
                    <StyledTitle style={{ alignSelf: "center" }}> Add Reminder</StyledTitle>
                    <Typography.Title level={3} style={{ alignSelf: "flex-start" }}>Name(s) :</Typography.Title>
                    <FormInput name="Name" rules={[{ required: true, message: 'Please enter name...' }]}>
                        <StyledInput type={"text"} placeholder="Eg: Rucha, Rahul & Maya" />
                    </FormInput>
                    <FormInput name="occasion" value={radioValue}>
                        <Radio.Group name="occasion" onChange={(e) => setRadioValue(e.target.value)} defaultValue="Birthday" size="large" style={{ gap: "16px", display: "flex", width: "100%", }}>
                            <Radio.Button value="Birthday" onChange={() => setIsCustomOccasion(false)} style={{ width: "50%", borderRadius: "6px", }}>Birthday</Radio.Button>
                            <Radio.Button value="Anniversary" onChange={() => setIsCustomOccasion(false)} style={{ width: "50%", borderRadius: "6px", }}>Anniversary</Radio.Button>
                            <Radio.Button value={customOccasionValue} onChange={() => setIsCustomOccasion(true)} style={{ width: "100%", borderRadius: "6px", }}>Others</Radio.Button>
                        </Radio.Group>
                    </FormInput>
                    {isCustomOccasion && <FormInput name="occasion">
                        <StyledInput type={"text"} placeholder="Enter Occasion" onChange={handleCustomOccasion} />
                    </FormInput>}
                    <FormInput name="occasionDate">
                        <DatePicker style={{ width: '100%' }} />
                    </FormInput>
                    <StyledFormWrapper >
                        <StyledButton type="primary" htmlType="submit">SAVE & ADD</StyledButton>
                    </StyledFormWrapper>
                </Form>
            </ContentWrapper>
        </Wrapper >)
}

const ThreeDotMenu = ({ data, mutate }: { data: SavedDatesModel & { userId: string }, mutate: any }) => {
    const handleMenuClick = async (e: any) => {
        if (e.key === 'delete') {
            const resp = await axios.delete(`${BASE_URL}/api/saved-dates/${data.id}`);
            if (resp.status === 200) {
                mutate();
                message.success('Date deleted successfully!');

            } else {
                message.error("Something went wrong, please try again");
            }
        }
    };

    const items = [
        {
            key: 'delete',
            label: 'Delete',
        },
    ];
    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <Button icon={<EllipsisOutlined />} />
        </Dropdown>
    );
};

const Wrapper = styled.div`

`;


const ContentWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 450px;
  flex-grow: 1;
`;

export const NameDiv = styled.h1`
color:#F2266B;
font-size: 32px;
margin: 0;
width:100%;

`
const StyledForm = styled(Form)`
  background-color: #fff0f2;
  min-width: 400px;
  padding: 20px;
  border-radius: 8px;
`;

const StyledTitle = styled.h2`
color: #F2266B;
margin: 0px 0px 8px 0px;
text - align: center;
align - self: flex - start;
justify - self: flex - start;
`
