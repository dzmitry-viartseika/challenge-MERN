import {useGithubLogin} from "../../../hooks/mutations/useGithubLogin";

const GithubLogin = () => {
    const { githubLogin } = useGithubLogin();
    const onGithubLogin = () => {
        window.open("https://localhost:4000/api/v1/auth/github", "_self");
    }
    return (
        <div className="py-10">
            <div onClick={onGithubLogin}>
                login with github
            </div>
        </div>
    )
};

export default GithubLogin;