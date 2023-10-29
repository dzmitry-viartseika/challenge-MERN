import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { InputText } from "primereact/inputtext";
import {Button} from "primereact/button";
import { useToast } from "../context/ToastContext";
import {useRegisterUser} from "../hooks/mutations/useRegisterUser";
import {useForgotPassword} from "../hooks/mutations/useForgotPassword";

interface IFormInput {
    email: string
    password: string
}
const ForgetPasswordPage = () => {
    const { forgotPassword } = useForgotPassword();
    const toast = useToast(); // Use the useToast hook
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: "",
        },
    })

    const showToastMessage = () => {
        console.log('showToastMessage')
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
            forgotPassword(data)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="min-w-1/4 flex flex-col border border-gray-200 rounded-sm p-4">
                <h1 className="text-center mb-4">Forgot Password?</h1>
                <div className="mb-4 w-full">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) =>
                            <>
                                <InputText
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