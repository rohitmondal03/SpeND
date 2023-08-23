import { supabase } from "@/lib/supabaseClient"
import { Button } from "./ui/button"


const SignOutBtn = ({ className }: { className?: string }) => {

    async function signout() {
        const { error } = await supabase.auth.signOut();

        if (error) console.log(error);
    }

    return (
        <Button
            variant={"destructive"}
            onClick={signout}
            className={className}
        >
            Sign Out
        </Button>
    )
}

export default SignOutBtn