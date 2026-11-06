export default function NotFound() {
  return (
    <div className="flex-1 border border-dashed rounded-md flex flex-col gap-3 items-center justify-center p-10">
      <p className="font-semibold md:text-5xl text-3xl">404</p>
      <h1 className="font-semibold md:text-xl text-base">Page not found</h1>
      <p className="text-muted-foreground md:w-100 w-full text-center md:text-base text-xs">
        The page you're looking for doesn't exist or is no longer available.
      </p>
    </div>
  );
}
