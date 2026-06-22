import { Header } from "./Header";
import { PreLaunchRibbon } from "./PreLaunchRibbon";

/** Fixed top chrome: header + ribbon stack with consistent gap. */
export function SiteChrome() {
  return (
    <div id="site-chrome" className="fixed inset-x-0 top-0 z-200 flex flex-col">
      <Header />
      <PreLaunchRibbon />
    </div>
  );
}
