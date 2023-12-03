import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { InputText } from "primereact/inputtext";
import {Button} from "primereact/button";
import { useToast } from "../context/ToastContext";
import {useRegisterUser} from "../hooks/mutations/useRegisterUser";
import {useForgotPassword} from "../hooks/mutations/useForgotPassword";
import Logo from "../components/Logo/Logo";
import {useNavigate} from "react-router-dom";
import {routes} from "../constants/routes";

interface IFormInput {
    email: string
    password: string
}
const ForgetPasswordPage = () => {
    const { forgotPassword } = useForgotPassword();
    const navigate = useNavigate();
    const toast = useToast(); // Use the useToast hook
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
        },
    })

    const showToastMessage = () => {
        toast.showToast({
            id: new Date().getTime(),
            severity: 'error',
            summary: 'Email address is required field',
        });
    };

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (!data.email) {
            showToastMessage()
            return ''
        } else {
            forgotPassword(data);
            toast.showToast({
                id: new Date().getTime(),
                severity: 'info',
                summary: 'Check your email out',
            });
            navigate(routes.LOGIN)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit(onSubmit)} className="col-3 d-flex flex-column border border-secondary rounded-sm p-4">
                <Logo />
                <h1 className="text-center mb-4">Forgot Password?</h1>
                <div className="mb-4 w-full">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <>
                                <InputText
                                    className="w-100"
                                    autoFocus={true}
                                    {...field}
                                    placeholder="Text your email"
                                />
                            </>}
                    />
                </div>
                <Button type="submit" label="Reset password" severity="info"/>
            </form>
        </div>
    )
};

export default ForgetPasswordPage;