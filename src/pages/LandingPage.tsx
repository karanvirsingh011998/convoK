
const LandingPage = () => {
    return (
        <div className="flex flex-col dark:text-white light:text-black">
            <section className="flex flex-col justify-center items-center  py-28">
                <h1 className="text-4xl md:text-6xl font-bold">Connect with Friends in Real Time</h1>
                <p className="mt-4 text-xl md:text-2xl">Experience seamless communication with our intuitive chat app.</p>
                <a href="/login" className="mt-6 px-8 py-3 bg-blue-600 text-lg rounded-full hover:bg-blue-500">Get Started</a>
            </section>
            <section id="features" className="w-full py-20 light:bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8">Why Choose Our Chat App?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="light:bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Real-time Messaging</h3>
                            <p>Instant chat for all your conversations.</p>
                        </div>
                        <div className="light:bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Secure and Private</h3>
                            <p>We prioritize your privacy with end-to-end encryption.</p>
                        </div>
                        <div className="light:bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Multi-Platform Support</h3>
                            <p>Available on mobile and web for seamless communication.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage