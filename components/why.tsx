import AnchorHeading from "@/components/anchor-heading";

export default function Why() {
  return (
    <section className="sm:px-6 lg:max-w-[750px]">
      <div className="space-y-6">
        <div className="space-y-1">
          <AnchorHeading id="why" className="scroll-m-12">
            Why
          </AnchorHeading>
          <p className="text-muted-foreground leading-7">Why did I create Lina in the first place?</p>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Problem</h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The main reason behind it was that custom scrollbar/scrollarea components looked amazing on desktop, but
              on mobile or general touch devices, the native scrollbars were just better, and I wanted to use those
              instead of a custom scrollbar.
            </p>
          </div>

          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">From Quick Fix to Full Component</h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              So I wrote a simple version back at the end of 2024 while working on one of our office projects. Fast
              forward to now, while building scrollable examples for{" "}
              <a href="https://revola.sameerjs.com" target="_blank" rel="" className="underline underline-offset-2">
                Revola
              </a>
              , I decided to turn that simple version into a full-fledged separate component. So I did.
            </p>
          </div>

          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Details</h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The initial version of Lina only had micro-interactions and native scrollable adaptation. But then I
              started noticing the details that make interfaces feel premium.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              While using{" "}
              <a href="https://v0.app" target="_blank" className="underline underline-offset-2">
                v0
              </a>
              , I spotted this smooth mask just above the chat input, content would fade in so elegantly. That visual
              caught my eye, and I knew I had to add it. These little touches make all the difference.
            </p>
          </div>

          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">The Goal</h3>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              &quot;If wer&rsquo;e going the custom ScrollArea route, why not make it look and feel purely custom,
              refined and detailed?.&quot;
            </blockquote>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              That&rsquo;s the philosophy behind Lina. No half-measures, no compromises, just a scrolling experience
              that feels intentionally well crafted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
