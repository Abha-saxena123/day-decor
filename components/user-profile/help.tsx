import { Card, Typography } from 'antd';
const { Meta } = Card;

export const Help = () => {

    return <Card
        hoverable
        style={{ width: "50vw", height: "70vh" }}
        cover={<img alt="logo" src="/logo.png" width="40vw" height="280vh" />}
    >
        <Typography.Title level={4}>For any query please contact us
        </Typography.Title>
        <Typography.Paragraph strong>Mobile No: 8233242012</Typography.Paragraph>
        <Typography.Paragraph strong>Email: daydecor@gmail.com</Typography.Paragraph>
    </Card>
}

