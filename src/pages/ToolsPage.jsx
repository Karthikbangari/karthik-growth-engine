import { useState } from "react";
import { Wand2, Link2, MessageSquareReply } from "lucide-react";
import PostGenerator from "../tools/PostGenerator";
import WhatsAppGenerator from "../tools/WhatsAppGenerator";
import FollowUpGenerator from "../tools/FollowUpGenerator";
import SectionHeading from "../components/SectionHeading";

const TABS = [
  { id: "post", label: "Post Generator", icon: Wand2, Comp: PostGenerator },
  { id: "wa", label: "WhatsApp Link", icon: Link2, Comp: WhatsAppGenerator },
  { id: "follow", label: "Follow-up", icon: MessageSquareReply, Comp: FollowUpGenerator },
];

export default function ToolsPage() {
  const [tab, setTab] = useState("post");
  const Active = TABS.find((t) => t.id === tab).Comp;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Your growth toolkit"
        title="Tools to win customers"
        subtitle="Create promotion content, build WhatsApp links and write follow-ups — all in one place."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-grotesk text-sm font-semibold transition ${
                active ? "bg-slate text-sand shadow-soft" : "bg-white/60 text-ink/70 hover:bg-white"
              }`}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <Active />
      </div>
    </div>
  );
}
