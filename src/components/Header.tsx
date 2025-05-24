import { Link } from '@tanstack/react-router'
import { Cog, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between m-1 p-3 transition-all duration-300 ease-in-out ${
                scrolled ? 'bg-black/20 backdrop-blur-sm rounded-xl' : ''
            }`}
        >
            <div className="flex items-center space-x-3">
                <div className="size-8 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AD</span>
                </div>
            </div>

            <div className="flex-1 mx-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <Input
                        placeholder="Search"
                        className="bg-white/20 border-none text-white placeholder:text-white/70 pl-10 rounded-full backdrop-blur-sm"
                    />
                </div>
            </div>

            <Link to="/" className="">
                <Button
                    variant="ghost"
                    size="icon"
                    className="flex justify-center items-center gap-2 text-white hover:bg-white/20 rounded-full"
                >
                    <Cog className="size-6" />
                </Button>
            </Link>
        </div>
    )
}
