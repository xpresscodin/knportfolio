import { widgetGroups } from '../../lib/builder/defaultBlocks'
export default function WidgetPanel({ addSection }) {
  return <div className="mt-5"><p className="text-sm text-slate-500">Drag widgets directly into the canvas. They render as live website blocks, not form rows.</p><div className="mt-4 grid grid-cols-2 gap-3">{widgetGroups.map((widget) => <button key={widget.type} draggable onDragStart={(event) => event.dataTransfer.setData('builder/section-type', widget.type)} onClick={() => addSection(widget.type)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-black shadow-sm transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg"><span className="block text-2xl">＋</span>{widget.label}</button>)}</div></div>
}
