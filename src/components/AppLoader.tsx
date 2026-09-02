import { SiReact, SiTypescript } from "react-icons/si";
import { VscCircuitBoard } from "react-icons/vsc";

export default function AppLoader({ leaving }: { leaving: boolean }) {
  return (
    <div className={`app-loader ${leaving ? "app-loader--leaving" : ""}`} role="status" aria-live="polite">
      <div className="app-loader__content">
        <div className="app-loader__flow" aria-hidden="true">
          <span><SiTypescript /></span>
          <i />
          <span><SiReact /></span>
          <i />
          <span><VscCircuitBoard /></span>
        </div>
        <strong>Opening Joel’s workspace</strong>
        <span>Preparing projects, visuals, and automations…</span>
        <div className="app-loader__track" aria-hidden="true"><i /></div>
      </div>
    </div>
  );
}
