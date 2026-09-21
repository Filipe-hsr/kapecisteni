import { KapeRuntime } from "@/components/kape-runtime";
import { HOME_HTML } from "@/content/home-markup";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />
      <KapeRuntime />
    </>
  );
}
