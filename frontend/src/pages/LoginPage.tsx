import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { InputText } from "primereact/inputtext";
import { useToast } from "../context/ToastContext";
import {useLoginUser} from "../hooks/mutations/useLoginUser";
import {routes} from "../constants/routes";
import {Link} from "react-router-dom";
import GithubLogin from "../components/LoginStrategy/GithubLogin/GithubLogin";
import GoogleLogin from "../components/LoginStrategy/GoogleLogin/GoogleLogin";
import ButtonBase from "../components/Buttons/ButtonBase";
import {Password} from "primereact/password";

interface IFormInput {
    email: string
    password: string
}
const LoginPage = () => {
    const { loginUser } = useLoginUser();
    const toast = useToast();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const showToastMessage = () => {
        console.log('showToastMessage')
        toast.showToast({
            id: new Date().getTime(),
            severity: 'error',
            summary: 'Email address and password are required fields',
        });
    };

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const { email, password } = data;
        if (!email || !password) {
            showToastMessage()
        } else {
            loginUser(data as any)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="min-w-1/4 flex flex-col border border-gray-200 rounded-sm p-4">
                {/*LOGO*/}
                <h1 className="text-center mb-4">Login</h1>
                <div className="mb-4 w-full">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <>
                                <InputText
                                    tabIndex={1}
                                    autoFocus={true}
                                    {...field}
                                    placeholder="Text your email"
                                />
                            </>}
                    />
                </div>
                <Link to={routes.FORGET_PASSWORD} className="mb-2 text-center">Forgot your password?</Link>
                <div className="mb-4 w-full">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <Password {...field}  placeholder="Text your password" toggleMask feedback={false} tabIndex={2}/>}
                    />
                </div>
                <div>
                    <GithubLogin />
                    <GoogleLogin />
                </div>
                <div>
                    Don't have an account yet? <Link to={routes.REGISTER} className="mb-2 text-center">Register</Link>
                </div>
                <ButtonBase text="Login" severity="info" />
            </form>
        </div>
    )
};

export default LoginPage;