import { FaFacebookF, FaTwitter, FaDribbble, FaLinkedinIn } from 'react-icons/fa'
import { useSiteData } from '../lib/site-data/SiteDataContext'

const socialIcons = [FaFacebookF, FaTwitter, FaDribbble, FaLinkedinIn]

export default function Sidebar() {
  const { site } = useSiteData()
  const profile = site?.profile || {}
  const media = site?.media || []
  const profileImage = media.find((item) => item.id === profile.imageMediaId) || media.find((item) => item.id === 'profile')
  const resume = media.find((item) => item.id === profile.resumeMediaId) || media.find((item) => item.id === 'resume-pdf')

  return (
    <div className="relative bg-[#FBE4D6] rounded-2xl shadow-xl pt-28 pb-8 px-6 text-center border border-gray-200 overflow-visible">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-30 bg-[#ffffff] p-1 rounded-2xl shadow-lg border-4 border-white z-20">
        <img
          src={profileImage?.url || '/assets/images/2.jpeg'}
          alt={profileImage?.alt || profile.name || 'Profile'}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      <h2 className="text-xl font-bold text-gray-900">{profile.name || 'Kenise Needham-Farquharson'}</h2>
      <p className="text-sm text-gray-500 mb-6">{profile.title || 'Spanish Teacher'}</p>

      <div className="flex justify-center gap-3 mb-6">
        {(profile.socialLinks?.length ? profile.socialLinks : [{ href: '#' }, { href: '#' }, { href: '#' }, { href: '#' }]).map((link, index) => {
          const Icon = socialIcons[index] || FaFacebookF
          return (
            <a key={`${link.href}-${index}`} href={link.href || '#'} className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
              <Icon />
            </a>
          )
        })}
      </div>

      <div className="text-left text-sm space-y-3 mb-6 text-gray-700">
        {profile.phone && <p><strong>📞 Phone:</strong> {profile.phone}</p>}
        {profile.location && <p><strong>📍 Location:</strong> {profile.location}</p>}
        {profile.email && <p><strong>✉ Email:</strong> {profile.email}</p>}
      </div>

      <a href={resume?.url || "/assets/images/Kenise Needham Farquharson's Resume - ep.pdf"} className="bg-primary text-white px-4 py-2 rounded inline-block hover:bg-red-600 transition">
        📥 {profile.resumeButtonText || 'Download CV'}
      </a>
    </div>
  )
}
