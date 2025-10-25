import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className=" min-h-screen mx-auto flex max-w-3xl items-center justify-center flex-col items-center gap-6 px-4 py-24 text-center">
      <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
        404 — Page Not Found
      </span>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Looks like this page took a wrong turn.
      </h1>
      <p className="text-base text-muted-foreground sm:text-lg">
        The URL you entered might be outdated or the page may have moved. Try
        heading back to our homepage or explore the services we deliver for
        growth-minded teams worldwide.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Talk to Moydus</Link>
        </Button>
      </div>
    </div>
  );
}
