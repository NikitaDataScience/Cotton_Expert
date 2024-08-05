
import React, { useState } from "react"
import "../Login/Login.css"
import { useNavigate } from "react-router-dom";


function Login() {
	const navigate = useNavigate();
	const [username, setusername] = useState("");
	const [password, setpassword] = useState("");



	const handleNav = () => {
		// console.log("userName", username);
		// console.log("password", password);

		if (username === 'Test01' && password === 'Test01') {

			navigate('/Livedatatabs');
			// alert("sucess");
		} else {
			alert("Invalid credentials");
		}
	}




	return (
		<div  >

			<div class="container" >
				<div class="screen" style={{ marginTop: 50 }}>
					<div class="screen__content">

						<form class="login">
							<div class="login__field">
								<i class="login__icon fas fa-user"></i>
								<input type="text" onChange={(e) => setusername(e.target.value)} name="username" class="login__input" placeholder="User name / Email"></input>
							</div>
							<div class="login__field">
								<i class="login__icon fas fa-lock"></i>
								<input type="password" onChange={(e) => setpassword(e.target.value)} name="password" class="login__input" placeholder="Password"></input>
							</div>
							<button class="button login__submit" onClick={handleNav}>
								<span class="button__text" > <a class="loginn" style={{ color: "black" }}>Log In Now</a></span>
								<i class="button__icon fas fa-chevron-right"></i>
							</button>
						</form>

					</div>
					<div class="screen__background">

						<span class="screen__background__shape screen__background__shape3"></span>
						<span class="screen__background__shape screen__background__shape2"></span>
						<span class="screen__background__shape screen__background__shape1"></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;
