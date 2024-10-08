const LandingComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full h-full bg-[#111827] overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
      </main>
    </>
  );
};

export default LandingComponent;
