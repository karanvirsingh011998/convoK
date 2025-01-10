const FooterComponent = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-4 text-center">
                <p>© {year} ConvoK. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default FooterComponent