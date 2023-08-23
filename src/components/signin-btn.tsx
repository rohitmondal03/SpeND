import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SignInBtn({ className }: { className?: string }) {
    return (
        <Button className={className}>
            <Link to={`/signin`}>Sign In</Link>
        </Button>
    )
}