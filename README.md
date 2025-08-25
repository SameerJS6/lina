# Lina

The Adaptive Scroll Area for Modern UIs

A responsive scroll area that feels native on touch devices, offering custom styling and enhanced interactions where it matters most.

Lina is a drop‑in replacement for shadcn/ui's `ScrollArea` with better defaults and a more native feel.

![](/main-mockup.png)

## Features

- **Adaptive mask** - Subtle edge fades appear only when content is scrollable and adapt in real time to scroll position, axis, and container shape.
- **Micro‑interactions** - Hover/press effects for the custom scrollbar on non‑touch (desktop) devices, with responsive thumb behavior.
- **Native touch optimization** - Uses the right touch‑action, momentum scrolling, and passive listeners so scrolling feels truly native on iOS/Android while staying precise on desktop.
- **Drop‑in replacement** - Matches shadcn/ui's `ScrollArea` API, same props, slots, and `className` ergonomics—so you can swap it in with zero extra step.
- **Radix and Base UI variants** - Choose Radix or Base UI primitives while keeping a consistent API and visual design.

## Installation

```bash
npx shadcn@latest add https://lina.sameer.sh/r/lina-radix.json
```

## Usage

```tsx
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Example() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the
      king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.
      And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they
      couldn't help but laugh. And once they started laughing, they couldn't stop.
    </ScrollArea>
  );
}
```

## Documentation

Visit [Docs](https://lina.sameer.sh)

## Credits

Built on top of:

- [Radix UI's Scroll Area](https://radix-ui.com/primitives/docs/components/scroll-area) by [Radix UI](https://radix-ui.com)
- [Base UI's Scroll Area](https://base-ui.com/react/components/scroll-area) by [Base UI](https://base-ui.com/)

## License

MIT
