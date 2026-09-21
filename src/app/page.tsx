import { KapeRuntime } from "@/components/kape-runtime";
import { HOME_HTML } from "@/content/home-markup";

export default function Home() {
  return (
    <>
      <canvas id="scene" aria-hidden="true" />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: HOME_HTML }} />
      <KapeRuntime />
    </>
  );
}
