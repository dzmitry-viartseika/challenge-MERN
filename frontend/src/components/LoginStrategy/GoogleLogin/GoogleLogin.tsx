
const GoogleLogin = () => {
    const onGoogleLogin = () => {
        window.open("http://localhost:4000/api/v1/auth/google", "_self");
    }
    return (
        <div className="py-10">
            <div onClick={onGoogleLogin}>
                Continue with Google
            </div>
        </div>
    )
};

export default GoogleLogin;