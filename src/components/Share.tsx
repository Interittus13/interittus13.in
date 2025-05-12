import React, { useState } from 'react'
import { SiX } from '@icons-pack/react-simple-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InlineShareButtons, SharingNetwork } from 'sharethis-reactjs'
import { useRouter } from 'next/router'
import { me } from '../../config/me'

export const Share = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(me.site + router.asPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const handleShareClick = (network: string) => {
    setTimeout(() => {
      const shareButton = document.querySelector(
        `#sharethis [data-network="${network}"]`
      ) as HTMLElement | null;
      if (shareButton) shareButton.click()
      else console.error(`${network} share button not found!`);
    }, 1000);
  };

  // Share Buttons configuration
  const shareButtons = [
    {
      name: "link",
      icon: <FontAwesomeIcon icon={faLink} />,
      color: "hover:text-orange-400",
      action: handleCopy,
    },
    {
      name: "twitter",
      icon: <SiX size="20" />,
      color: "hover:text-blue-400",
      action: () => handleShareClick("twitter"),
    },
  ]

  return (
    <>
      <div id="sharethis" className="hidden">
        <InlineShareButtons
          config={{
            alignment: 'left',
            color: 'social',
            enabled: true,
            font_size: 16,
            labels: null,
            language: 'en',
            networks: shareButtons
              .filter((btn) => btn.name !== "link")
              .map((btn) => btn.name as SharingNetwork), 
            url: me.site + router.asPath,
            padding: 7,
            radius: 9,
            show_total: false,
            size: 25,
          }}
        />
      </div>

      <div className="flex items-center space-x-5 text-true-gray-400 mt-4 relative">
        {shareButtons.map((share) => (
          <button
            key={share.name}
            className={`leading-0 ${share.color}`}
            onClick={share.action}
          >
            {share.icon}
          </button>
        ))}
        <p
          id="copiedNotify"
          className={`pointer-events-none transition-all duration-500 delay-100 ease-in-out ${
            copied ? 'opacity-100' : 'opacity-0'
          } text-sm rounded-full border-1 border-true-gray-400/10 px-2 py-1 absolute left-32`}
        >
          Copied
        </p>
      </div>
    </>
  )
}
