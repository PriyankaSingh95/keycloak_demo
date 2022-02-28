import React, { useState, useEffect } from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'


export default function App() {
  const keycloakConfig =
    {
      clientId: "react-keycloak",
      realm: "keycloak_demo",
      url: "http://localhost:8080/auth/",
      resource: "react-keycloak",
      publicClient: true,
  }

  const initOptions = {
                    pkceMethod: 'S256',
                    onLoad: 'login-required'
                     }

    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loggedIn,setLoggedIn]=useState(window.accessToken!==null)
    const [output,setOutput]=useState("")

    useEffect(() => {
        const keycloak = Keycloak(keycloakConfig);
        keycloak.init(initOptions).then(authenticated=>{
        setKeycloak(keycloak);
        setAuthenticated(authenticated);
        console.log(authenticated);
        if(authenticated){
        console.log(keycloak.token);
        window.accessToken = keycloak.token;}
        })
      },[]);

    const logoutHandler = ()=>{
    keycloak.logout();
    setLoggedIn(false);
    setAuthenticated(false);}

   const allEmployees= (e)=>
    {    e.preventDefault();
         //document.getElementById('username').innerText = keycloak.subject;

         var url = 'http://localhost:8081/employee';

         var req = new XMLHttpRequest();
         req.open('GET', url, true);
         req.setRequestHeader('Accept', 'application/json');
         req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
         req.setRequestHeader('Access-Control-Allow-Origin','*')

         req.onreadystatechange =  ()=> {
             if (req.readyState == 4) {
                 if (req.status == 200) {
                    // alert(req.response);
                    setOutput(req.responseText);
                 } else if (req.status == 403) {
                     alert('Forbidden');
                 }
             }
         }

         req.send();
     }

     const oneEmployee= (e)=>
         {    e.preventDefault();

              var url = 'http://localhost:8081/employee/1';

              var req = new XMLHttpRequest();
              req.open('GET', url, true);
              req.setRequestHeader('Accept', 'application/json');
              req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
              req.setRequestHeader('Access-Control-Allow-Origin','*')

              req.onreadystatechange =  ()=> {
                  if (req.readyState == 4) {
                      if (req.status == 200) {
                          //alert(req.response);
                          setOutput(req.responseText);
                      } else if (req.status == 403) {
                          alert('Forbidden');
                      }
                  }
              }

              req.send();
          }

          const createEmployee= (e)=>
              {    e.preventDefault();

                   var url = 'http://localhost:8081/employee/create';

                   var req = new XMLHttpRequest();
                   req.open('POST', url, true);
                   req.setRequestHeader('Content-Type', 'application/json');
                   req.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
                   req.setRequestHeader('Access-Control-Allow-Origin','*')

                   req.onreadystatechange =  ()=> {
                       if (req.readyState == 4) {
                           if (req.status == 200) {
                               //alert(req.response);
                               setOutput(req.responseText);
                           } else if (req.status == 403) {
                               alert('Forbidden');
                           }
                       }
                   }

              req.send(JSON.stringify({name:"New", designation:"Java Developer", emailId:"new@gmail.com", contactNo:"9438943843"}));
               }



    return (
            <div> {
             keycloak?
             ((authenticated)?
               <div>
                   <a href="#" onClick={allEmployees}>All Employees </a><br/>
                   <a href="#" onClick={oneEmployee}>One Employee </a><br/>
                   <a href="#" onClick={createEmployee}>Create</a><br/><br/>
                    <textarea
                             value={output}
                             type='readOnly'
                             id='output'
                             rows={5}
                             cols={5}
                           /><br/><br/>
               <button onClick={keycloak.logout}> Logout </button>
               </div>:
                <button onClick={keycloak.login}> Login </button>):
                <></>   }
             </div> )}

//export default App