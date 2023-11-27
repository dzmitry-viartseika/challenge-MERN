import {useGithubLogin} from "../../../hooks/mutations/useGithubLogin";

const GithubLogin = () => {
    const { githubLogin } = useGithubLogin();
    const onGithubLogin = () => {
        window.open("https://localhost:4000/api/v1/auth/github", "_self");
    }
    return (
        <div className="py-10">
            <div onClick={onGithubLogin}>
                login with
                <i className="mx-2 pi pi-github" style={{ fontSize: '1rem' }}></i>
            </div>
        </div>
    )
};

export default GithubLogin;