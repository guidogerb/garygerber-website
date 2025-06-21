import {useEffect, useState} from "react";
import type {Schema} from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import {generateClient} from "aws-amplify/data";
import { useAuth } from "react-oidc-context";

const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const { user, signOut } = useAuthenticator();
    
    const auth = useAuth();
    const signOutRedirect = () => {
        const clientId = "327p4ullsu3r06h66a149f94go";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://<user pool domain>";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };
    if (auth.isLoading) {
       return <div>Loading...</div>;
    }
    if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
    }
    if (auth.isAuthenticated) {
        return (
          <div>
            <pre> Hello: {auth.user?.profile.email} </pre>
            <pre> ID Token: {auth.user?.id_token} </pre>
            <pre> Access Token: {auth.user?.access_token} </pre>
            <pre> Refresh Token: {auth.user?.refresh_token} </pre>
    
            <button onClick={() => auth.removeUser()}>Sign out</button>
          </div>
        );
    }

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }, []);

    function deleteTodo(id: string) {
        client.models.Todo.delete({id})
    }

    function createTodo() {
        client.models.Todo.create({content: window.prompt("Todo content")});
    }

    return (
        <main>
            <h1>{user?.signInDetails?.loginId}'s todos</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}  onClick={() => deleteTodo(todo.id)}>{todo.content}</li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br/>
                <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                    Review next step of this tutorial.
                </a>
            </div>
            <button onClick={signOut}>Sign out</button>
            <div>
                <button onClick={() => auth.signinRedirect()}>Sign in</button>
                <button onClick={() => signOutRedirect()}>Sign out</button>
            </div>
        </main>
    );
}

export default App;
