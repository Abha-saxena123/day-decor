import { useRouter } from 'next/router'

export default function Page() {
    const router = useRouter()
    return <h2>Post: {router.query.category}</h2>
}