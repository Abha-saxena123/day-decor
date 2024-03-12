
import { LoginForm } from '@/components/auth/login-form'
import { AuthFormLayout } from '@/components/common/components/layout/auth-form-layout';
import { NextPage } from 'next';

type NextPageWithAuthLayout = NextPage & {
    auth?: boolean;
    getLayout?: any
};

const Login: NextPageWithAuthLayout = () => {
    return <LoginForm />
}

export default Login;

Login.auth = false;

Login.getLayout = function getLayout(page: any) {
    return (
        <AuthFormLayout>{page}
        </AuthFormLayout>
    )
}

