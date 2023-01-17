import Head from 'next/head'
import nookies from 'nookies'


function Form() {
    const handleLogin = (e) => {
        e.preventDefault();
        const username = document.querySelector('#user').value;
        const password = document.querySelector('#pass').value;

        if(username === 'admin' && password === 'Leonora2019@!'){
            nookies.set(null, 'isLogin', "true", {
                path: '/',
                maxAge: 86400 * 7
            })
            window.location.href = '/'
        }else{
            alert('Invalid username or password')
        }
    }
  return (
    <>
        <section className="hero is-primary is-fullheight">
        <div className="hero-body">
        <div className="container">
            <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" className="box">
                <div className="field">
                    <label htmlFor="" className="label">UserName</label>
                    <div className="control has-icons-left">
                    <input type="text" id='user' placeholder="e.g. ankitt" className="input" required />
                    <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                    </span>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="" className="label">Password</label>
                    <div className="control has-icons-left">
                    <input type="password" id='pass' placeholder="*******" className="input" required />
                    <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                    </span>
                    </div>
                </div>
                <div className="field">
                    <button className="button is-success" onClick={handleLogin}>
                        Login
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
        </section>
    </>
  )
}

function Login(props){
    return (
        <>
            <Head>
                <title>Login</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css" />
            </Head>
            <Form />
        </>
    )
}

export default Login