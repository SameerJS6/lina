import AdaptiveMask from "@/components/adaptive-mask";
import MicroInteractions from "@/components/micro-interactions";
import NativeTouch from "@/components/native-touch";

export default function Features() {
  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:p-4 md:grid-cols-2 xl:grid-cols-3 md:[&>*:nth-child(3)]:max-xl:col-span-2">
      <MicroInteractions />
      <AdaptiveMask />
      <NativeTouch />
    </section>
  );
}
