
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { AuthFormLayout } from '@/components/common/components/layout/auth-form-layout';
import { NextPage } from 'next';

type NextPageWithAuthLayout = NextPage & {
    auth?: boolean;
    getLayout?: any
};

const ForgotPassword: NextPageWithAuthLayout = () => {
    return <ForgotPasswordForm />
}

export default ForgotPassword;

ForgotPassword.auth = false;

ForgotPassword.getLayout = function getLayout(page: any) {
    return (
        <AuthFormLayout>{page}
        </AuthFormLayout>
    )
}

