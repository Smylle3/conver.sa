import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { supabase } from "config/supabaseClient";

import Login from "pages/login";
import Chat from "pages/chat";

function App() {
    const session = supabase.auth.session();
    console.log(session)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
