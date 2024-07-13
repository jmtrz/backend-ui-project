import { FormEvent, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("ReturnUrl"));
    console.log(searchParams.get("returnUrl"));
    if (searchParams.has("ReturnUrl")) {
      // Parse the query string
      
      const params = new URLSearchParams(searchParams.get("ReturnUrl")!); 

      // Decode and format the parameters
      // const formattedParams = {
      //   client_id: "4ecc4153-daf9-4eca-8b60-818a63637a81", //4ecc4153-daf9-4eca-8b60-818a63637a81
      //   redirect_uri: decodeURIComponent(params.get('redirect_uri')!),
      //   scope: decodeURIComponent(params.get('scope')!),
      //   response_type: params.get('response_type'),
      //   state: params.get('state'),
      //   nonce: params.get('nonce'),
      //   code_challenge: params.get('code_challenge'),
      //   code_challenge_method: params.get('code_challenge_method')
      // };
      
      // localStorage.setItem("returnUrl", searchParams.get("ReturnUrl")!);     
      localStorage.setItem("returnUrl", decodeURIComponent(params.get("redirect_uri")!));     
    } else {      

      const params = new URLSearchParams(searchParams.get("returnUrl")!); 
      // localStorage.setItem("returnUrl", searchParams.get("returnUrl")!);
      localStorage.setItem("returnUrl", decodeURIComponent(params.get("redirect_uri")!));    
    }
  },[]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;

      const formData = new FormData(form);

      const response = await fetch("/api/login", {
        body: JSON.stringify({
          userName: formData.get("userName"),
          password: formData.get("password"),
          returnUrl: searchParams.get("returnUrl"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const { returnUrl } = await response.json();

        window.location.href = returnUrl;
      } else {
        form.reset();
      }
    },
    [searchParams],
  );

  const handleSubmitGoogle = async () => {

    const returnUrl = encodeURIComponent(searchParams.get("returnUrl") ?? searchParams.get("ReturnUrl")!);
    const doubleEncodedReturnUrl = encodeURIComponent(returnUrl);
    console.log(`return url: ${doubleEncodedReturnUrl}`); 
    window.location.href = `/auth/google?returnUrl=${returnUrl}`;
  }

  const handleGoogleLogin = () => {
    return fetch('https://localhost:7110/login')
    .then(res => console.log(res));
  }


  return (
    <div style={{ 
        height:'100svh', 
        width:'100%', 
        display:'flex',
        flexDirection:'column',
        gap:'10px',
        justifyContent:'center',
        alignItems:'center'
      }} >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username: </label>
          <input
            autoComplete="username"
            id="userName"
            name="userName"
            required
            type="text"
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            autoComplete="current-password"
            id="password"
            name="password"
            required
            type="password"
          />
        </div>

        <button type="submit">Log in</button>
      </form>
      <div>
          <button style={{
              padding:'10px 0',
              // width:'5%', 
              // height:'3%', 
              border:'none',
              borderRadius:'5px',
              fontSize:'1.5rem',
              color:'#fff',
              cursor:'pointer',
              fontWeight:'bold' }} onClick={handleSubmitGoogle}>
            Sign in with Google
          </button>
      </div>
      <div>
        <button onClick={handleGoogleLogin}>
            GOOGLE AGAIN
        </button>
      </div>
    </div>
  );
}