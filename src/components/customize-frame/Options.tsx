const Options = ({ onClick, src, backgroundSize }: any) => {
  return (
    <div
      className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-white cursor-pointer hover:scale-110 transition-transform"
      onClick={onClick}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: backgroundSize,
        backgroundPosition: "center",
      }}
    />
  );
};

export default Options;
