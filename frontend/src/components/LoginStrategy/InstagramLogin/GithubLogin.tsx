import {useInstagramLogin} from "../../../hooks/mutations/useInstagramLogin";

const InstagramLogin = () => {
    const { instagramLogin } = useInstagramLogin();
    const onGithubLogin = () => {
        window.open("http://localhost:4000/api/v1/auth/facebook", "_self");
    }
    return (
        <div className="py-10">
            <div onClick={onGithubLogin}>
                Continue with Facebook
            </div>
        </div>
    )
};

export default InstagramLogin;