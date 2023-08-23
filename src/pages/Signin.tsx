import { useNavigate } from "react-router-dom"

import { Auth, AuthCard } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

import { supabase } from "@/lib/supabaseClient"
import { AuthChangeEvent } from "@supabase/supabase-js"


const Signin = () => {
    const navigate = useNavigate();

    supabase.auth.onAuthStateChange(async (event: AuthChangeEvent) => {
       if(event === "SIGNED_IN") navigate(-1)
       if(event === "SIGNED_OUT") navigate("/")
    })

    return (
        <div className="flex items-center justify-center py-10">
            <AuthCard>
                <h1 className="text-center font-bold text-2xl">Sign In to SpeND</h1>
                <Auth
                    supabaseClient={supabase}
                    theme="dark"
                    providers={["discord", "google", "github"]}
                    appearance={{ theme: ThemeSupa }}
                />
            </AuthCard>
        </div>
    )
}

export default Signin