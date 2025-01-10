const FooterComponent = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-8 px-4 border-t">
      <div className="max-w-7xl mx-auto text-center text-muted-foreground">
        <p>© {year} ConvoK. All rights reserved.</p>
        <p className="mt-2">Built with security and privacy in mind.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
