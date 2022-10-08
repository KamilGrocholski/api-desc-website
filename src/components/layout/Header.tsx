import { useRouter } from "next/router"

const Header = () => {

    const { push } = useRouter()

    return (
        <header>
            <button onClick={ () => push('/') }>
                Home
            </button>
            <button onClick={ () => push('/your-requests') }>
                Your requests
            </button>
        </header>
    )
}

export default Header