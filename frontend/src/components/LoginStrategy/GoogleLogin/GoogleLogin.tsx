const GoogleLogin = () => {
  const onGoogleLogin = () => {
    window.open('https://localhost:4000/api/v1/auth/google', '_self')
  }
  return (
    <div className="py-10">
      <div onClick={onGoogleLogin}>
        Continue with
        <i className="mx-2 pi pi-google" style={{ fontSize: '1rem' }}></i>
      </div>
    </div>
  )
}

export default GoogleLogin
