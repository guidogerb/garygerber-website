import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_plQjITfx7",
  client_id: "327p4ullsu3r06h66a149f94go",
  redirect_uri: "https://garygerber.com/login/callback",
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone profile",
};

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...cognitoAuthConfig}>
            <Authenticator>
                <App />
            </Authenticator>
        </AuthProvider>
    </React.StrictMode>
);
/**
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
 */