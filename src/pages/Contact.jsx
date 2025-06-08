

export default function Contact() {
  return (
    
      <><h1 className="text-3xl font-bold mb-4">📬 Contact</h1><form
      action="https://formspree.io/f/your-form-id"
      method="POST"
      className="grid gap-4 max-w-md"
    >
      <input name="name" placeholder="Your Name" required className="p-2 border rounded" />
      <input name="email" type="email" placeholder="Email" required className="p-2 border rounded" />
      <textarea name="message" rows="5" placeholder="Message" className="p-2 border rounded" required></textarea>
      <button type="submit" className="bg-accent text-white px-4 py-2 rounded">Send</button>
    </form></>
    
  )
}
