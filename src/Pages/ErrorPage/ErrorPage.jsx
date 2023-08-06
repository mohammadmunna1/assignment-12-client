import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="mt-10 max-w-xl mx-auto">

            <iframe className="mx-auto" src="https://giphy.com/embed/8L0Pky6C83SzkzU55a" width="480" height="480" allowFullScreen></iframe>

            <div className="btn btn-block bg-orange-500 text-white border-0 text-xl"><Link to='/'>Back to home</Link></div>
        </div>
    );
}