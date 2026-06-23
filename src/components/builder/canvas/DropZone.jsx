export default function DropZone({ onDropSection, label }) {
  return <div onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const type = event.dataTransfer.getData('builder/section-type'); if (type) onDropSection(type) }} className="my-3 rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 px-4 py-3 text-center text-xs font-black uppercase tracking-wide text-slate-500 transition hover:border-sky-500 hover:bg-sky-50">{label}</div>
}
