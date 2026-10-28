export default function NotFound() {
  return (
    <div className="flex-1 border border-dashed rounded-md flex flex-col gap-3 items-center justify-center">
      <p className="font-semibold text-5xl">404</p>
      <h1 className="font-semibold text-xl">Page not found</h1>
      <p className="text-muted-foreground w-100 text-center">
        The page you're looking for doesn't exist or is no longer available.
      </p>
    </div>
  );
}
