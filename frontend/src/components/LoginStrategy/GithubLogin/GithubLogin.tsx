import {useGithubLogin} from "../../../hooks/mutations/useGithubLogin";

const GithubLogin = () => {
    const { githubLogin } = useGithubLogin();
    const onGithubLogin = () => {
        const popup = window.open("http://localhost:4000/api/v1/auth/github", "_blank", "width=620, height=700");

        // Add an event listener to capture the user data
        window.addEventListener("message", (event) => {
            if (event.origin === "http://localhost:4000") {
                console.log("User data received:", event.data);

                // You can access the user data here and extract the GitHub user ID
                // For example, if the user data is in JSON format:
                const userData = JSON.parse(event.data);
                const githubUserId = userData.id;
                console.log("GitHub User ID:", githubUserId);
                localStorage.setItem('githubUserId', githubUserId)
                window.location.href = "http://localhost:3000/dashboard";
                // Now you can use the GitHub user ID or store it in state as needed
            }
        });
    }
    return (
        <div className="py-10">
            <div onClick={onGithubLogin}>
                login with github
            </div>
          {/*  <div*/}
          {/*      onClick={(event) => {*/}
          {/*          event.preventDefault();*/}
          {/*          const popup = window.open(*/}
          {/*              "http://localhost:4000/api/v1/auth/github",*/}
          {/*              "targetWindow",*/}
          {/*              `toolbar=no,*/}
          {/*location=no,*/}
          {/*status=no,*/}
          {/*menubar=no,*/}
          {/*scrollbars=yes,*/}
          {/*resizable=yes,*/}
          {/*width=620,*/}
          {/*height=700`*/}
          {/*          );*/}

          {/*          window.addEventListener("message", (event) => {*/}
          {/*              if (event.origin === "http://localhost:4000") {*/}
          {/*                  console.log(' JSON.stringify(event.data)',  JSON.stringify(event.data))*/}
          {/*                  if (event.data) {*/}
          {/*                      localStorage.setItem("user", JSON.stringify(event.data));*/}

          {/*                      popup?.close();*/}
          {/*                  }*/}
          {/*              }*/}
          {/*          });*/}
          {/*      }}*/}
          {/*  >*/}
          {/*      LOGIN WITH GITHUB*/}
          {/*  </div>*/}
        </div>
    )
};

export default GithubLogin;