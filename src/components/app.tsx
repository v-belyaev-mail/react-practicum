import AppHeader from "./app-header/app-header.tsx";
import {AppContent} from "./app-content/app-content.tsx";

export default function App()
{
    return (
        <div className="burger-app">
            <AppHeader/>
            <AppContent/>
        </div>
    )
}