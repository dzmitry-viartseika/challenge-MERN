import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { InputText } from "primereact/inputtext";
import {Button} from "primereact/button";
import { useToast } from "../context/ToastContext";
import {useLoginUser} from "../hooks/mutations/useLoginUser";

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
                <h1 className="text-center mb-4">Login</h1>
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
                <div className="mb-4 w-full">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <InputText {...field}  placeholder="Text your password" />}
                    />
                </div>
                <Button type="submit" label="Login"/>
            </form>
        </div>
    )
};

export default LoginPage;